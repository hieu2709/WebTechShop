<?php

namespace App\Providers;

use App\Models\User;
use App\Services\UserService;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Support\Facades\Hash;

class ApiUserProvider implements UserProvider
{
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @inheritDoc
     */
    public function retrieveById($identifier): ?User
    {
        return $this->userService->getById($identifier);
    }

    /**
     * @inheritDoc
     */
    public function retrieveByToken($identifier, $token): ?User
    {
        return $this->userService->getByToken($token);
    }

    /**
     * @inheritDoc
     */
    public function updateRememberToken(Authenticatable $user, $token)
    {
    }

    /**
     * @inheritDoc
     */
    public function retrieveByCredentials(array $credentials): ?User
    {
        if (empty($credentials) || !array_key_exists("email", $credentials)) {
            return null;
        }

        return $this->userService
            ->getByCondition([
                "email" => $credentials["email"],
            ])
            ->first();
    }

    /**
     * @inheritDoc
     */
    public function validateCredentials(Authenticatable $user, array $credentials): bool
    {
        $plain = $credentials["password"];
        return Hash::check($plain, $user->getAuthPassword());
    }
}
