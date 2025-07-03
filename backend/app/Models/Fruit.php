<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fruit extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id', 'name', 'description',
        'price', 'quantity', 'image_url'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
