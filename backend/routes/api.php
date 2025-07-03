<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\FruitController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PaymentController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // User routes
    Route::apiResource('categories', CategoryController::class)->only(['index', 'show']);
    Route::apiResource('fruits', FruitController::class)->only(['index', 'show']);
    Route::apiResource('orders', OrderController::class);
    Route::post('/payment-intent', [PaymentController::class, 'createPaymentIntent']);

    // Admin routes
    Route::middleware('admin')->group(function () {
        Route::apiResource('categories', CategoryController::class)->except(['index', 'show']);
        Route::apiResource('fruits', FruitController::class)->except(['index', 'show']);
        Route::get('/admin/orders', [OrderController::class, 'adminIndex']);
        Route::put('/admin/orders/{order}', [OrderController::class, 'adminUpdate']);
    });
});
