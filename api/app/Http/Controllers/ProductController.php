<?php

namespace App\Http\Controllers;

use App\Enums\ProductTypeEnum;
use App\Enums\ProductTypeName;
use App\Helpers\ImageUploadHelper;
use App\Helpers\ResponseHelper;
use App\Http\Requests\Product\CreateProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Http\Requests\User\ImageUploadRequest;
use App\Models\ProductType;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;


class ProductController extends Controller
{
    protected ProductService $productService;
    protected ProductType $laptopType;
    protected ProductType $desktopType;
    protected ProductType $networkingType;
    protected ProductType $printerType;
    protected ProductType $partType;
    protected ProductType $smartphoneType;
    protected ProductType $cameraType;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
        $this->laptopType = ProductType::where(["name" => ProductTypeEnum::LAPTOP])->first();
        $this->desktopType = ProductType::where(["name" => ProductTypeEnum::DESKTOP_PC])->first();
        $this->networkingType = ProductType::where(["name" => ProductTypeEnum::NETWORKING_DEVICE])->first();
        $this->printerType = ProductType::where(["name" => ProductTypeEnum::PRINTER])->first();
        $this->partType = ProductType::where(["name" => ProductTypeEnum::PC_PART])->first();
        $this->smartphoneType = ProductType::where(["name" => ProductTypeEnum::SMARTPHONE])->first();
        $this->cameraType = ProductType::where(["name" => ProductTypeEnum::CAMERA])->first();
    }

    public function laptopProduct(Request $request): JsonResponse
    {
        $this->productService->applyCondition(["product_type_id" => $this->laptopType->id, "is_disabled" => 0]);
        $this->productService->applyIndexFilter($request->all());
        return ResponseHelper::success($this->productService->getList());
    }

    public function desktopProduct(Request $request): JsonResponse
    {
        $this->productService->applyCondition(["product_type_id" => $this->desktopType->id, "is_disabled" => 0]);
        $this->productService->applyIndexFilter($request->all());
        return ResponseHelper::success($this->productService->getList());
    }

    public function networkingProduct(Request $request): JsonResponse
    {
        $this->productService->applyCondition(["product_type_id" => $this->networkingType->id, "is_disabled" => 0]);
        $this->productService->applyIndexFilter($request->all());
        return ResponseHelper::success($this->productService->getList());
    }

    public function printerProduct(Request $request): JsonResponse
    {
        $this->productService->applyCondition(["product_type_id" => $this->printerType->id, "is_disabled" => 0]);
        $this->productService->applyIndexFilter($request->all());
        return ResponseHelper::success($this->productService->getList());
    }

    public function partProduct(Request $request): JsonResponse
    {
        $this->productService->applyCondition(["product_type_id" => $this->partType->id, "is_disabled" => 0]);
        $this->productService->applyIndexFilter($request->all());
        return ResponseHelper::success($this->productService->getList());
    }

    public function smartphoneProduct(Request $request): JsonResponse
    {
        $this->productService->applyCondition(["product_type_id" => $this->smartphoneType->id, "is_disabled" => 0]);
        $this->productService->applyIndexFilter($request->all());
        return ResponseHelper::success($this->productService->getList());
    }

    public function cameraProduct(Request $request): JsonResponse
    {
        $this->productService->applyCondition(["product_type_id" => $this->cameraType->id, "is_disabled" => 0]);
        $this->productService->applyIndexFilter($request->all());
        return ResponseHelper::success($this->productService->getList());
    }

    public function allProduct(): JsonResponse
    {

        return ResponseHelper::success([$this->productService->applyCondition5Product(["product_type_id" => $this->laptopType->id, "is_disabled" => 0] ),
            $this->productService->applyCondition5Product(["product_type_id" => $this->desktopType->id, "is_disabled" => 0]),
            $this->productService->applyCondition5Product(["product_type_id" => $this->networkingType->id, "is_disabled" => 0] ),
            $this->productService->applyCondition5Product(["product_type_id" => $this->printerType->id, "is_disabled" => 0] ),
            $this->productService->applyCondition5Product(["product_type_id" => $this->partType->id, "is_disabled" => 0] ),
            $this->productService->applyCondition5Product(["product_type_id" => $this->smartphoneType->id, "is_disabled" => 0] ),
            $this->productService->applyCondition5Product(["product_type_id" => $this->cameraType->id, "is_disabled" => 0] )]);
    }

    public function getAllProduct():JsonResponse{

        return ResponseHelper::success(["data" => $this->productService->getAll()]);
    }





    public function index(Request $request): JsonResponse
    {
        $this->productService->applyIndexFilter($request->all());
        return ResponseHelper::success($this->productService->getList(["brand", "productType"]));
    }

    public function detail($id): JsonResponse
    {
        return ResponseHelper::success(["product" => $this->productService->getById($id)->load(["brand", "productType"])]);
    }

    public function addProduct(CreateProductRequest $request): JsonResponse
    {
        $product = $this->productService->create($request->validated());
        if ($request->hasFile("image")) {
            $path = ImageUploadHelper::handleImageUpload($request->file("image"), "public/product", $product->picture);
            if ($path) {
                $product->update(["picture" => $path]);
            }
        }
        $product->load("brand", "productType");
        return ResponseHelper::success(["product" => $product]);
    }

    public function updateProduct(UpdateProductRequest $request, $id): JsonResponse
    {
        $product = $this->productService->getById($id);
        if (!$product) {
            return ResponseHelper::notFound();
        }
        $path = null;
        if ($request->hasFile("image")) {
            $path = ImageUploadHelper::handleImageUpload($request->file("image"), "public/product", $product->picture);
        }
        $validatedParams = $request->validated();
        if ($path) {
            $validatedParams["picture"] = $path;
        }
        $product->update($validatedParams);
        $product->load("brand", "productType");
        return ResponseHelper::success(["product" => $product]);
    }

    public function deleteProduct($id): JsonResponse
    {
        $product = $this->productService->getById($id);
        if (!$product) {
            return ResponseHelper::notFound();
        }
        $product->delete();
        return ResponseHelper::success([]);
    }

}
