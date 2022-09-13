import { ApiResponse } from "@/types/api";
import { User } from "@/types/models/user";
import { appApi } from "@/api";
import { API } from "@/configs/api.config";

export type LoginResponse = ApiResponse<{ user: User; token: string; remember: boolean }>;
export type AuthCheckResponse = ApiResponse<{ user: User }>;
export type RegisterResponse = ApiResponse<{ user: User }>;

export const authApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, { email: string; password: string }>({
            query: (arg) => ({
                url: API.AUTH_LOGIN,
                method: "POST",
                body: arg,
            }),
        }),
        authCheck: builder.mutation<AuthCheckResponse, void>({
            query: () => API.AUTH_CHECK,
        }),
        logout: builder.mutation<ApiResponse<boolean>, void>({
            query: () => ({
                url: API.AUTH_LOGOUT,
                method: "DELETE",
            }),
        }),
        register: builder.mutation<
            RegisterResponse,
            { first_name: string; last_name: string; email: string; password: string }
        >({
            query: (arg) => ({
                url: API.REGISTER,
                method: "POST",
                body: arg,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useAuthCheckMutation } = authApi;
