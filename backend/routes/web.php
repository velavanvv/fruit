<?php

use App\Models\Fruit;
use Illuminate\Support\Facades\Route;

Route::get('/fruits', function () {
    return Fruit::with('category')->get();
});
