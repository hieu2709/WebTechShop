import { appApi } from "@/api";
import { API } from "@/configs/api.config";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/models/user";

export type UsersUpdateProfileResponse = ApiResponse<{ user: User }>;
export type UsersChangePasswordResponse = ApiResponse<void>;
export type UsersChangeEmailResponse = ApiResponse<void>;
export type UsersUpdateAvatarResponse = ApiResponse<string>;
export type UserVerifyChangeEmailResponse = ApiResponse<{ user: User }>;

export const userApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        updateProfileUser: builder.mutation<UsersUpdateProfileResponse, { first_name: string; last_name: string }>({
            query: (arg) => ({
                url: API.USER_UPDATE_PROFILE,
                method: "PUT",
                body: arg,
            }),
        }),
        changePasswordUser: builder.mutation<
            UsersChangePasswordResponse,
            { current_password: string; new_password: string }
        >({
            query: (arg) => ({
                url: API.USER_CHANGE_PASSWORD,
                method: "PUT",
                body: arg,
            }),
        }),
        updateAvatarUser: builder.mutation<UsersUpdateAvatarResponse, File>({
            query(data) {
                let formData = new FormData();
                formData.append("file", data);
                return {
                    url: API.USER_UPDATE_AVATAR,
                    method: "POST",
                    body: formData,
                };
            },
        }),
        changeEmailUser: builder.mutation<UsersChangeEmailResponse, { new_email: string }>({
            query: (arg) => ({
                url: API.USER_CHANGE_EMAIL,
                method: "POST",
                body: arg,
            }),
        }),
        verifyNewEmailUser: builder.mutation<UserVerifyChangeEmailResponse, string>({
            query: (queryString) => ({
                url: API.USER_VERIFY_EMAIL + "?" + queryString,
                method: "GET",
            }),
        }),
        resendEmail: builder.mutation<UsersChangeEmailResponse, void>({
            query: () => ({
                url: API.USER_RESEND_EMAIL,
                method: "POST",
            }),
        }),
    }),
});

export const {
    useChangePasswordUserMutation,
    useUpdateProfileUserMutation,
    useUpdateAvatarUserMutation,
    useChangeEmailUserMutation,
    useVerifyNewEmailUserMutation,
    useResendEmailMutation,
} = userApi;
