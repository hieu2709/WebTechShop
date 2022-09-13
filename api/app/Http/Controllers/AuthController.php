<?php

namespace App\Http\Controllers;

use App\Enums\ErrorCode;
use App\Helpers\RequestHelper;
use App\Helpers\ResponseHelper;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\AccessTokenService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected AccessTokenService $accessTokenService;

    public function __construct(AccessTokenService $accessTokenService)
    {
        $this->accessTokenService = $accessTokenService;
    }

    private function getUser(): ?Authenticatable
    {
        return Auth::user();
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $result = Auth::attempt($request->validated());
        if (!$result) {
            return ResponseHelper::unauthorized(ErrorCode::AuthInvalidCredentials);
        }
        $tokenDuration = $request->input("remember") ? config("auth.token_duration") : 1440;
        $token = $this->accessTokenService->createToken(Auth::id(), $tokenDuration);
        return ResponseHelper::success([
            "user" => $this->getUser(),
            "token" => $token->token,
        ])->withCookie(
            cookie("access_token", $token->token, $request->input("remember") ? $tokenDuration : 0, null, null, true)
        );
    }

    public function authCheck(): JsonResponse
    {
        return ResponseHelper::success([
            "user" => $this->getUser(),
            "is_admin" =>$this->getUser()->hasRole("admin"),
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $this->accessTokenService->removeToken(RequestHelper::getTokenFromRequest($request));
        return ResponseHelper::success(true)->withCookie(cookie()->forget("access_token"));
    }

}
