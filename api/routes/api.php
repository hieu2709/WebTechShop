<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\ProductTypeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post("/register", [UserController::class, "register"]);
Route::post("/auth/login", [AuthController::class, "login"]);
Route::get("/auth/check", [AuthController::class, "authCheck"]);
Route::delete("/auth/logout", [AuthController::class, "logout"]);

Route::get("/product", [ProductController::class, "index"]);
Route::get("/product/all", [ProductController::class, "allProduct"]);
Route::get("/product/app", [ProductController::class, "getAllProduct"]);
Route::get("/product/laptop", [ProductController::class, "laptopProduct"]);
Route::get("/product/desktop", [ProductController::class, "desktopProduct"]);
Route::get("/product/networking", [ProductController::class, "networkingProduct"]);
Route::get("/product/printer", [ProductController::class, "printerProduct"]);
Route::get("/product/part", [ProductController::class, "partProduct"]);
Route::get("/product/smartphone", [ProductController::class, "smartphoneProduct"]);
Route::get("/product/camera", [ProductController::class, "cameraProduct"]);

Route::get("/product/{id}", [ProductController::class, "detail"]);

Route::get("/brand", [BrandController::class, "index"]);
Route::get("/product-type", [ProductTypeController::class, "index"]);

Route::group(["middleware" => ["auth:api", "verified"]], function () {
    Route::put("/profile/update", [UserController::class, "updateProfile"]);
    Route::put("/profile/change-password", [UserController::class, "changePassword"]);
    Route::post("/profile/avatar", [UserController::class, "updateAvatar"]);

    Route::get("/cart", [CartController::class, "getCart"]);
    Route::post("/cart/add", [CartController::class, "addToCart"]);
    Route::post("/cart/remove", [CartController::class, "removeFromCart"]);
    Route::post("/cart/delete", [CartController::class, "deleteProductCart"]);
    Route::delete("/cart", [CartController::class, "emptyCart"]);

    Route::post("/order", [OrderController::class, "createOrder"]);
    Route::get("/order", [OrderController::class, "index"]);
    Route::get("/order/{id}", [OrderController::class, "detail"]);

    Route::group(['middleware' => ['role:admin']], function () {
        Route::post("/product", [ProductController::class, "addProduct"]);
        Route::post("/product/{id}", [ProductController::class, "updateProduct"]);
        Route::delete("/product/{id}", [ProductController::class, "deleteProduct"]);
    });
});
