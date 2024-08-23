<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class ProductController extends Controller
{
    public function list()
    {
        return Inertia::render('Product/List', [
            'product' => Product::with(['category'])->get()
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
