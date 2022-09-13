<?php

namespace App\Enums;

use BenSampo\Enum\Contracts\LocalizedEnum;
use BenSampo\Enum\Enum;

final class ErrorCode extends Enum implements LocalizedEnum
{
    /**
     * Common error code (starts with E_)
     */
    const BadRequest = "E_BAD_REQUEST";
    const Unauthorized = "E_UNAUTHORIZED";
    const Forbidden = "E_FORBIDDEN";
    const NotFound = "E_NOT_FOUND";
    const MethodNotAllowed = "E_METHOD_NOT_ALLOWED";
    const UnprocessableEntity = "E_UNPROCESSABLE_ENTITY";
    const InternalServerError = "E_INTERNAL_SERVER_ERROR";

    const NoAccessToken = "E_NO_ACCESS_TOKEN";
    const InvalidAccessToken = "E_INVALID_ACCESS_TOKEN";

    const SentMailError = "E_SEND_MAIL_ERROR";
    const InvalidSignature = "E_INVALID_SIGNATURE";

    const MaximumFileSizeExceeded = "E_MAXIMUM_FILE_SIZE_EXCEEDED";
    const InvalidMimesType = "E_INVALID_MIMES_TYPE";

    /**
     * Page specific error code (not starts with E_)
     */
    // Auth
    const AuthInvalidCredentials = "AUTH_INVALID_CREDENTIALS";
    const AuthResetPasswordRequestThrottled = "AUTH_RESET_PASSWORD_REQUEST_THROTTLED";
    const AuthResetPasswordInvalidToken = "AUTH_RESET_PASSWORD_INVALID_TOKEN";

    // Project
    const ProjectCreateError = "PROJECT_CREATE_ERROR";
    const ProjectCreateUploadUrlError = "PROJECT_CREATE_UPLOAD_URLS_ERROR";
}
