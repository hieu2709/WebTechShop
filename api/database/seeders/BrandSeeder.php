<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    public function run()
    {
        Brand::firstOrCreate([
            "name" => "SamSung",
            "display_name" => "SamSung",
        ]);
        Brand::firstOrCreate([
            "name" => "Xiaomi",
            "display_name" => "Xiaomi",
        ]);
        Brand::firstOrCreate([
            "name" => "Tecno",
            "display_name" => "Tecno",
        ]);
        Brand::firstOrCreate([
            "name" => "Asus",
            "display_name" => "Asus",
        ]);
        Brand::firstOrCreate([
            "name" => "Realme",
            "display_name" => "Realme",
        ]);
        Brand::firstOrCreate([
            "name" => "Apple",
            "display_name" => "Apple",
        ]);
        Brand::firstOrCreate([
            "name" => "Oppo",
            "display_name" => "Oppo",
        ]);
        Brand::firstOrCreate([
            "name" => "Nokia",
            "display_name" => "Nokia",
        ]);
        Brand::firstOrCreate([
            "name" => "BPhone",
            "display_name" => "BPhone",
        ]);
        Brand::firstOrCreate([
            "name" => "Acer",
            "display_name" => "Acer",
        ]);
        Brand::firstOrCreate([
            "name" => "Lenovo",
            "display_name" => "Lenovo",
        ]);
        Brand::firstOrCreate([
            "name" => "Microsoft",
            "display_name" => "Microsoft",
        ]);
        Brand::firstOrCreate([
            "name" => "Fujtsu",
            "display_name" => "Fujtsu",
        ]);
        Brand::firstOrCreate([
            "name" => "Hp",
            "display_name" => "Hp",
        ]);
        Brand::firstOrCreate([
            "name" => "Gopro",
            "display_name" => "Gopro",
        ]);
        Brand::firstOrCreate([
            "name" => "Canon",
            "display_name" => "Canon",
        ]);
        Brand::firstOrCreate([
            "name" => "Brother",
            "display_name" => "Brother",
        ]);
        Brand::firstOrCreate([
            "name" => "Ezviz",
            "display_name" => "Ezviz",
        ]);
        Brand::firstOrCreate([
            "name" => "E-Power",
            "display_name" => "E-Power",
        ]);
        Brand::firstOrCreate([
            "name" => "Viettel",
            "display_name" => "Viettel",
        ]);
    }
}
