<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Fruit;
use Illuminate\Http\Request;

class FruitController extends Controller
{
    public function index()
    {
        return response()->json(Fruit::with('category')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'image_url' => 'nullable|url'
        ]);

        $fruit = Fruit::create($validated);
        return response()->json($fruit->load('category'), 201);
    }

    public function show(Fruit $fruit)
    {
        return response()->json($fruit->load('category'));
    }

    public function update(Request $request, Fruit $fruit)
    {
        $validated = $request->validate([
            'category_id' => 'sometimes|required|exists:categories,id',
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'price' => 'sometimes|required|numeric|min:0',
            'quantity' => 'sometimes|required|integer|min:0',
            'image_url' => 'nullable|url'
        ]);

        $fruit->update($validated);
        return response()->json($fruit->load('category'));
    }

    public function destroy(Fruit $fruit)
    {
        $fruit->delete();
        return response()->json(null, 204);
    }
}
