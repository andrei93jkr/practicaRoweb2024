<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Http\Request;


class ProductController extends Controller
{
    public function list(Request $request)
    {

        // Acceseaza parametrii din url request
        $categoryId = $request->input('category_id');

        //interogare categorii pentru lista dropdown
        $categories = Category::all();

        //interogare produse, filtrare pe categorie daca category_id este furnizat
        $products = Product::with(['category'])
            ->when($categoryId, function ($query, $categoryId) {
                //intoarce ca raspuns din query category_id folosind variabila $categoryId
                return $query->where('category_id', $categoryId);
            })
            ->paginate(3)
            ->withQueryString();

        // intoarce ca raspuns catre inertia view produsele, filtrele si categoria selectata
        return Inertia::render('Product/List', [
            'product' => $products,
            'categories' => $categories,
            'selectedCategory' => $categoryId,
        ]);

    }

    public function create()
    {
        return Inertia::render('Product/AddEdit', [
            'categories' => Category::select(['name', 'id'])->get()
        ]);
    }

    public function update(Product $product)
    {
        $product->load('images');

        return Inertia::render('Product/AddEdit', [
            'categories' => Category::select(['name', 'id'])->get(),
            'product' => $product,
        ]);
    }

    public function store(ProductRequest $request, ?Product $product = null)
    {
        $request->updateOrCreateProduct($product);

        return redirect()->route('product.list')->with(['success' => 'Product saved.']);
    }

    public function delete(Product $product)
    {
        $product->images()->each(function ($productImage) {
            Storage::disk('public')->delete($productImage->path);
            $productImage->delete();
        });

        Storage::disk('public')->deleteDirectory('products/' . $product->id);
        $product->delete();

        return redirect()->route('product.list')->with(['succes' => 'Product deleted.']);
    }
}
