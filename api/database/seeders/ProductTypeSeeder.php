<?php

namespace Database\Seeders;

use App\Enums\ProductTypeEnum;
use App\Models\ProductType;
use Illuminate\Database\Seeder;

class ProductTypeSeeder extends Seeder
{
    public function run()
    {
        ProductType::firstOrCreate([
            "name" => ProductTypeEnum::LAPTOP,
            "display_name" => "Laptop",
        ]);
        ProductType::firstOrCreate([
            "name" => ProductTypeEnum::DESKTOP_PC,
            "display_name" => "DesktopPC",
        ]);
        ProductType::firstOrCreate([
            "name" => ProductTypeEnum::NETWORKING_DEVICE,
            "display_name" => "NetworkingDevice",
        ]);
        ProductType::firstOrCreate([
            "name" => ProductTypeEnum::PRINTER,
            "display_name" => "Printer",
        ]);
        ProductType::firstOrCreate([
            "name" => ProductTypeEnum::PC_PART,
            "display_name" => "PCPart",
        ]);
        ProductType::firstOrCreate([
            "name" => ProductTypeEnum::SMARTPHONE,
            "display_name" => "Smartphone",
        ]);
        ProductType::firstOrCreate([
            "name" => ProductTypeEnum::CAMERA,
            "display_name" => "Camera",
        ]);
    }
}
