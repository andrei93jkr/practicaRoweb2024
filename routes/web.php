<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//rute pentru categories
Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::group([
        'prefix' => 'categories',
    ], function () {
        Route::get('/', [CategoryController::class, 'list'])->name('categories.list');
        Route::get('/create', [CategoryController::class, 'create'])->name('categories.create');
        Route::get('/edit/{category}', [CategoryController::class, 'update'])->name('categories.update');
        Route::post('store/{category?}', [CategoryController::class, 'store'])->name('categories.store');
        Route::delete('delete/{category}', [CategoryController::class, 'delete'])->name('categories.delete');
    });
});


//route pentru products 
Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::group([
        'prefix' => 'products',
    ], function () {
        Route::get('/', [ProductController::class, 'list'])->name('product.list');
        Route::get('/create', [ProductController::class, 'create'])->name('product.create');
        Route::get('/edit/{product}', [ProductController::class, 'update'])->name('product.update');
        Route::post('store/{product?}', [ProductController::class, 'store'])->name('product.store');
        Route::delete('delete/{product}', [ProductController::class, 'delete'])->name('product.delete');
    });
});

require __DIR__ . '/auth.php';