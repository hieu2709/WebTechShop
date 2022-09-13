<?php

namespace App\Services;

use App\Models\Cart;
use Illuminate\Database\Eloquent\Model;

class CartService extends BaseService
{
    protected array $searchFields = [];
    protected array $freeSearchFields = [];

    public function model(): string
    {
        return Cart::class;
    }

    public function getCartByUserId($userId) {
        return $this->getByCondition(["user_id" => $userId])->load("product");
//        return $this->model->where(["user_id" => $userId])->load("products")->get();
    }

    public function addToCart($userId, $productId) {
        $cartItem = $this->getByCondition(["user_id" => $userId, "product_id" => $productId])->first();
        if ($cartItem) {
            Cart::where(["user_id" => $userId, "product_id" => $productId])->update(["count" => $cartItem->count + 1]);
        } else {
            $this->create(["user_id" => $userId, "product_id" => $productId, "count" => 1]);
        }
    }

    public function removeFromCart($userId, $productId, $count = 1) {
        $cartItem = $this->getByCondition(["user_id" => $userId, "product_id" => $productId])->first();
        if ($cartItem) {
            if ($cartItem->count - $count <= 0) {
                $cartItem->delete();
            } else {
                Cart::where(["user_id" => $userId, "product_id" => $productId])->update(["count" => $cartItem->count - $count]);
            }
        }
    }

    public function deleteProductFormCart($userId, $productId){
        $this->delete(["user_id" => $userId, "product_id" => $productId]);
    }

    public function emptyCartByUserId($userId) {
        $this->delete(["user_id" => $userId]);
    }

}
