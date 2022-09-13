<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Database\Eloquent\Model;

class ProductService extends BaseService
{
    protected array $searchFields = ["name"];
    protected array $freeSearchFields = ["name", "price", "description"];

    public function model(): string
    {
        return Product::class;
    }

}
