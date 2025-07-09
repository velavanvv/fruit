<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\FruitController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PaymentController;

// Handle OPTIONS requests for CORS preflight
Route::options('/{any}', function () {
    return response()->noContent()
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
})->where('any', '.*');

// Test endpoint
Route::get('/test', function() {
    return response()->json(['message' => 'API is working!']);
});

// API routes group
Route::middleware(['api', 'cors'])->prefix('api')->group(function () {
    // Public routes
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    // Protected routes
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
});
