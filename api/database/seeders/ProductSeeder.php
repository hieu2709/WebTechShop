<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run()
    {
        Product::firstOrCreate([
            "name" => "Iphone 13 Pro max",
            "price" => "10000000",
            "brand_id" => 1,
            "product_type_id" => 6
        ]);
    }
}
