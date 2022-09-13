<?php

namespace App\Http\Controllers;

use App\Enums\RoleEnum;
use App\Helpers\ResponseHelper;
use App\Http\Requests\User\ChangePasswordRequest;
use App\Http\Requests\User\RegisterRequest;
use App\Http\Requests\User\UpdateProfileRequest;
use App\Services\UserService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Queue\Queue;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public UserService $userService;

    /**
     * @param UserService $userService
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $params = $request->validated();
        $params["password"] = Hash::make($request->input("password"));
        $user = $this->userService->create($params);
        $user->assignRole(RoleEnum::USER_ROLE);
 //       Queue::createPayloadUsing($user->sendEmailVerificationNotification());
        Event::dispatch(new Registered($user));

        return ResponseHelper::success($user);
    }

    public function updateProfile(UpdateProfileRequest $request): JsonResponse
    {
        $params = $request->validated();
        $user = Auth::user();
        $this->userService->update($params, ["id" => $user->id]);
        return ResponseHelper::success([
            "user" => $user->fresh(),
        ]);
    }

    public function changePassword(ChangePasswordRequest $request): JsonResponse
    {
        $params = $request->validated();
        $user = Auth::user();
        $this->userService->update(["password" => Hash::make($params["new_password"])], ["id" => $user->id]);
        return ResponseHelper::success();
    }
}


