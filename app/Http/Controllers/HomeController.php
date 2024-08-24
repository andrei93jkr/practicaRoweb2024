<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        // Acceseaza parametrii din url request
        $categoryId = $request->input('category_id');
        $searchInput = $request->input('search_term');


        //interogare categorii pentru lista dropdown
        $categories = Category::all();

        //interogare produse, filtrare pe categorie daca category_id este furnizat
        $products = Product::with(['category', 'images'])
            ->when($categoryId, function ($query, $categoryId) {
                //intoarce ca raspuns din query category_id folosind variabila $categoryId
                return $query->where('category_id', $categoryId);
            })
            ->when($searchInput, function ($query, $searchInput) {
                //intoarce ca raspuns din query searchInput
                return $query->where('name', 'like', '%' . $searchInput . '%');
            })
            ->paginate(3)
            ->withQueryString();

        // intoarce ca raspuns catre inertia view produsele, filtrele si categoria selectata
        return Inertia::render('Welcome', [
            'products' => $products,
            'categories' => $categories,
            'selectedCategory' => $categoryId,
            'searchTerm' => $searchInput,
        ]);
    }
}
