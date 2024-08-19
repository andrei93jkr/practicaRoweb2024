<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;


class ProductController extends Controller
{
    public function list()
    {
        return Inertia::render('Product/List', [
            'products' => Product::orderBy('id', 'asc')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Product/AddEdit');
    }

    public function update(Product $product)
    {
        return Inertia::render('Product/AddEdit', [
            'products' => $product,
        ]);
    }

    public function store(ProductRequest $request, ?Product $product = null)
    {
        $request->updateOrCreateProduct($product);

        return redirect()->route('product.list')->with(['success' => 'Product saved.']);
    }

    public function delete(Product $product)
    {
        $product->delete();

        return redirect()->route('product.list')->with(['succes' => 'Product deleted.']);
    }
}
