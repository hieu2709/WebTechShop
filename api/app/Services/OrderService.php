<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\Order;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class OrderService extends BaseService
{
    protected array $searchFields = [];
    protected array $freeSearchFields = [];

    public function model(): string
    {
        return Order::class;
    }

    public function getOrdersOfUserById($userId) {
        return $this->model->where(["user_id" => $userId])->with(["products"])->get();
    }

    public function getOrderOfUserById($userId, $orderId) {
        return $this->model->where(["user_id" => $userId, "id" => $orderId])->with(["products"])->first();
    }

    public function createOrder($userId, $params) {
        DB::beginTransaction();
        try {
            $order = $this->create($params);
            if ($order) {
                foreach (Cart::where(["user_id" => $userId])->get() as $cartItem) {
                    $order->products()->attach([$cartItem["product_id"] => ['count' => $cartItem["count"]]]);
                };
                Cart::where(["user_id" => $userId])->delete();
            }
            DB::commit();
            return $this->getOrderOfUserById($userId, $order->id);
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

}
