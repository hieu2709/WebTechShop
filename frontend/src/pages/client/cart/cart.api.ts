import { ApiResponse } from "@/types/api";
import { appApi } from "@/api";
import { API } from "@/configs/api.config";

export const cartApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        addCart: builder.mutation<ApiResponse<any>, { product_id: number }>({
            query: (arg) => ({
                url: API.ADD_TO_CART,
                method: "POST",
                body: arg,
            }),
        }),

        getCart: builder.query<ApiResponse<any>, void>({
            query: () => ({
                url: API.GET_CART,
                method: "GET",
            }),
        }),

        deleteCartItem: builder.mutation<ApiResponse<any>, { product_id: number }>({
            query: (arg) => ({
                url: API.REMOVE_CART_ITEM,
                method: "POST",
                body: arg,
            }),
        }),

        emptyCart: builder.mutation<ApiResponse<any>, void>({
            query: () => ({
                url: API.EMPTY_CART,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useAddCartMutation, useGetCartQuery, useEmptyCartMutation, useDeleteCartItemMutation } = cartApi;
