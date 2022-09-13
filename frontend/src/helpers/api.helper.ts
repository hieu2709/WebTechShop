import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ApiResponse } from "@/types/api";
import ErrorCodeEnum, { ErrorCodeType } from "@/enums/error_code.enum";

export type ApiError = { status: number; data: ApiResponse<any> };
export type ApiValidationError = { status: number; data: ApiResponse<Record<string, string[]>> };

const ApiHelper = {
    isFetchError(error: unknown): error is FetchBaseQueryError {
        return typeof error === "object" && error != null && "status" in error;
    },
    isApiError(error: unknown): error is ApiError {
        if (!ApiHelper.isFetchError(error)) return false;
        return typeof error.data === "object" && !!error.data && "data" in error.data;
    },
    isValidationError(error: unknown): error is ApiValidationError {
        if (!ApiHelper.isApiError(error)) return false;
        return error.data.error === ErrorCodeEnum.UNPROCESSABLE_ENTITY.value;
    },
    isErrorType(error: unknown, type: ErrorCodeType): boolean {
        if (!ApiHelper.isApiError(error)) return false;
        return error.data.error === ErrorCodeEnum[type].value;
    },
};

export default ApiHelper;
