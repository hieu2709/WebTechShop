<?php

namespace App\Providers;

use App\Services\Auth\TokenGuard;
use App\Services\UserService;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Auth::extend("api-token", function ($app, $name, array $config) {
            return new TokenGuard(Auth::createUserProvider($config["provider"]));
        });

        Auth::provider("api-user-provider", function ($app, array $config) {
            $userService = app(UserService::class);
            return new ApiUserProvider($userService);
        });
    }
}
