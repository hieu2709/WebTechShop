<?php

namespace App\Http\Controllers;

use App\Enums\ProductTypeName;
use App\Helpers\ResponseHelper;
use App\Http\Requests\Cart\AddToCartRequest;
use App\Http\Requests\Cart\RemoveFromCartRequest;
use App\Http\Requests\Order\CreateOrderRequest;
use App\Models\ProductType;
use App\Services\CartService;
use App\Services\OrderService;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class OrderController extends Controller
{
    protected OrderService $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function createOrder(CreateOrderRequest $request) {
        $validatedRequest = $request->validated();
        $validatedRequest["user_id"] = Auth::id();
        $order = $this->orderService->createOrder(Auth::id(), $validatedRequest);
        return ResponseHelper::success(["order" => $order]);
    }

    public function index() {
        return ResponseHelper::success(["orders" => $this->orderService->getOrdersOfUserById(Auth::id())]);
    }

    public function detail($id) {
        return ResponseHelper::success(["order" => $this->orderService->getOrderOfUserById(Auth::id(), $id)]);
    }

}
