<?php

namespace App\Helpers;

use App\Enums\ErrorCode;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;

/**
 * @codeCoverageIgnore
 */
class ResponseHelper
{
    /**
     * Success response with data
     *
     * @param mixed $data
     * @param string $message
     * @param int $status
     * @return JsonResponse
     */
    public static function success(array|string $data = [], string $message = "", int $status = 200): JsonResponse
    {
        return Response::json(
            [
                "success" => true,
                "message" => $message,
                "data" => $data,
            ],
            $status
        );
    }

    /**
     * Error response with error code & error message
     *
     * @param $code
     * @param $message
     * @param $status
     * @param null $data
     * @return JsonResponse
     */
    public static function error($code, $message, $status, $data = null): JsonResponse
    {
        if ($message === null) {
            try {
                $message = ErrorCode::getDescription($code);
            } catch (Exception $e) {
                Log::error("Invalid error code: " . $code);
            }
        }
        return response()->json(
            [
                "success" => false,
                "error" => $code,
                "message" => $message,
                "data" => $data,
            ],
            $status
        );
    }

    /**
     * Bad request response
     *
     * @param string|null $code
     * @param string|null $message
     * @return JsonResponse
     */
    public static function badRequest(?string $code = null, ?string $message = null): JsonResponse
    {
        if ($code === null) {
            $code = ErrorCode::BadRequest;
        }
        return self::error($code, $message, 400);
    }

    /**
     * Unauthorized response
     *
     * @param string|null $code
     * @param string|null $message
     * @return JsonResponse
     */
    public static function unauthorized(?string $code = null, ?string $message = null): JsonResponse
    {
        if ($code === null) {
            $code = ErrorCode::Unauthorized;
        }
        return self::error($code, $message, 401);
    }

    /**
     * Forbidden response
     *
     * @param string|null $code
     * @param string|null $message
     * @return JsonResponse
     */
    public static function forbidden(?string $code = null, ?string $message = null): JsonResponse
    {
        if ($code === null) {
            $code = ErrorCode::Forbidden;
        }
        return self::error($code, $message, 403);
    }

    /**
     * Not found response
     *
     * @param string|null $code
     * @param string|null $message
     * @return JsonResponse
     */
    public static function notFound(?string $code = null, ?string $message = null): JsonResponse
    {
        if ($code === null) {
            $code = ErrorCode::NotFound;
        }
        return self::error($code, $message, 404);
    }

    /**
     * Method not allow response
     *
     * @param string|null $code
     * @param string|null $message
     * @return JsonResponse
     */
    public static function methodNotAllowed(?string $code = null, ?string $message = null): JsonResponse
    {
        if ($code === null) {
            $code = ErrorCode::MethodNotAllowed;
        }
        return self::error($code, $message, 405);
    }

    /**
     * Unprocessable Entity response
     *
     * @param string|null $code
     * @param string|null $message
     * @param null $data
     * @return JsonResponse
     */
    public static function unprocessableEntity(
        ?string $code = null,
        ?string $message = null,
        $data = null
    ): JsonResponse {
        if ($code === null) {
            $code = ErrorCode::UnprocessableEntity;
        }
        return self::error($code, $message, 422, $data);
    }

    /**
     * Internal server error response
     *
     * @param string|null $code
     * @param string|null $message
     * @return JsonResponse
     */
    public static function internalServerError(?string $code = null, ?string $message = null): JsonResponse
    {
        if ($code === null) {
            $code = ErrorCode::InternalServerError;
        }
        return self::error($code, $message, 500);
    }
}
