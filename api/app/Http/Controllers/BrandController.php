<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Models\Brand;
use Illuminate\Http\JsonResponse;

class BrandController extends Controller
{

    public function __construct()
    {
    }

    public function index(): JsonResponse
    {
        return ResponseHelper::success(["brands" => Brand::all()]);
    }

}
