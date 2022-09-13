<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ["name", "price", "description", "picture", "is_disabled", "product_type_id", "brand_id" ];

    public function productType()
    {
        return $this->belongsTo(ProductType::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

}
