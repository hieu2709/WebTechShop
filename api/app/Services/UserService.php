<?php

namespace App\Services;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class UserService extends BaseService
{
    protected array $searchFields = ["first_name", "last_name", "email", "email_verified_at"];
    protected array $freeSearchFields = ["first_name", "last_name", "email"];

    public function model(): string
    {
        return User::class;
    }

    /**
     * @param $token
     * @return ?User
     */
    public function getByToken($token): ?Model
    {
        return $this->model
            ->whereHas("accessTokens", function ($q) use ($token) {
                $q->where("token", $token)->where("expired_at", ">", Carbon::now());
            })
            ->first();
    }
}
