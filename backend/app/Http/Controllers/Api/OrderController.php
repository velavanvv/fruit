<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validated = $request->validate([
        'total_amount' => 'required|numeric',
        'payment_method' => 'required|string',
        'shipping_address' => 'required|string',
        'items' => 'required|array',
        'items.*.fruit_id' => 'required|exists:fruits,id',
        'items.*.quantity' => 'required|integer|min:1',
        'items.*.price' => 'required|numeric|min:0',
    ]);

    $order = Order::create([
        'user_id' => optional(Auth::user())->id,
        'total_amount' => $validated['total_amount'],
        'status' => 'pending',
        'payment_method' => $validated['payment_method'],
        'shipping_address' => $validated['shipping_address'],
    ]);

    foreach ($validated['items'] as $item) {
        $order->items()->create([
            'fruit_id' => $item['fruit_id'],
            'quantity' => $item['quantity'],
            'price' => $item['price'],
        ]);
    }

    return response()->json($order, 201);
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
