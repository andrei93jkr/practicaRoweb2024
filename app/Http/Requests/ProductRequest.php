<?php
namespace App\Http\Requests;

use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'id' => ['required', 'numeric'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric'],
            'quantity' => ['required', 'numeric'],
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
        $product->price = $this->get('price');
        $product->quantity = $this->get('quantity');
        $product->save();

    }
}
