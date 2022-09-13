<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Models\ProductType;
use Illuminate\Http\JsonResponse;

class ProductTypeController extends Controller
{

    public function __construct()
    {
    }

    public function index(): JsonResponse
    {
        return ResponseHelper::success(["brands" => ProductType::all()]);
    }

}
