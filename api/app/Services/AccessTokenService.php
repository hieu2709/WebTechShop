<?php

namespace App\Services;

use App\Models\AccessToken;
use Carbon\Carbon;
use Illuminate\Support\Str;

class AccessTokenService extends BaseService
{
    protected array $searchFields = ["token", "expired_at", "user|first_name", "user|email_verified_at"];
    protected array $freeSearchFields = ["user|first_name"];

    public function model(): string
    {
        return AccessToken::class;
    }

    public function createToken(int $userId, int $tokenDuration = 60)
    {
        return $this->model->create([
            "user_id" => $userId,
            "token" => Str::random(100),
            "expired_at" => Carbon::now()->addMinutes($tokenDuration),
        ]);
    }

    public function removeToken($token)
    {
        return $this->model->where("token", $token)->delete();
    }
}
