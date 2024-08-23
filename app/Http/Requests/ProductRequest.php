<?php
namespace App\Http\Requests;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;

class ProductRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'id' => ['required', 'numeric'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'category' => ['required', 'exists:categories,id'],
            'price' => ['required', 'numeric'],
            'quantity' => ['required', 'numeric'],
            'images' => ['nullable', 'array'],
            'images.*' => ['image'],
            'deleted_images' => ['nullable', 'array'],
            'deleted_images.*' => ['exists:product_images,id'],
        ];
    }

    public function updateOrCreateProduct(?Product $product = null): void
    {

        if (!$product) {
            $product = new Product();
        }

        $product->id = $this->get('id');
        $product->name = $this->get('name');
        $product->description = $this->get('description');
        $product->category_id = $this->get('category');
        $product->price = $this->get('price');
        $product->quantity = $this->get('quantity');
        $product->save();

        if ($this->hasFile('images')) {
            foreach ($this->file('images') as $uploadedImage) {
                $path = $uploadedImage->store('products/' . $product->id, 'public');

                if ($path) {
                    $productImage = new ProductImage();
                    $productImage->product_id = $product->id;
                    $productImage->path = $path;
                    $productImage->save();
                }
            }
        }

        if ($this->has('deleted_images')) {
            foreach ($this->get('deleted_images') as $deletedImage) {
                $productImage = ProductImage::find($deletedImage);
                Storage::disk('public')->delete($productImage->path);
                $productImage->delete();
            }
        }

    }
}
