<?php

namespace App\Http\Controllers;

use App\Enums\ProductTypeName;
use App\Helpers\ResponseHelper;
use App\Http\Requests\Cart\AddToCartRequest;
use App\Http\Requests\Cart\RemoveFromCartRequest;
use App\Models\ProductType;
use App\Services\CartService;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class CartController extends Controller
{
    protected CartService $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    public function getCart(): JsonResponse
    {
        return ResponseHelper::success(["cart" => $this->cartService->getCartByUserId(Auth::id())]);
    }

    public function addToCart(AddToCartRequest $request): JsonResponse
    {
        if (!$request->validated()) {
            return ResponseHelper::unprocessableEntity();
        }
        $this->cartService->addToCart(Auth::id(), $request->product_id);
        return ResponseHelper::success(["cart" => $this->cartService->getCartByUserId(Auth::id())]);
    }

    public function removeFromCart(RemoveFromCartRequest $request): JsonResponse
    {
        if (!$request->validated()) {
            return ResponseHelper::unprocessableEntity();
        }
        $this->cartService->removeFromCart(Auth::id(), $request->product_id, isset($request["count"]) ? $request["count"] : 1);
        return ResponseHelper::success(["cart" => $this->cartService->getCartByUserId(Auth::id())]);
    }

    public function deleteProductCart(AddToCartRequest $request): JsonResponse
    {
        if (!$request->validated()) {
            return ResponseHelper::unprocessableEntity();
        }
        $this->cartService->deleteProductFormCart(Auth::id(), $request->product_id);
        return ResponseHelper::success(["cart" => $this->cartService->getCartByUserId(Auth::id())]);
    }

    public function emptyCart(): JsonResponse
    {
        $this->cartService->emptyCartByUserId(Auth::id());
        return ResponseHelper::success(["cart" => $this->cartService->getCartByUserId(Auth::id())]);
    }

}
