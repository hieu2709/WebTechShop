import { ApiResponse } from "@/types/api";
import { appApi } from "@/api";
import { API } from "@/configs/api.config";

export const productApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getAll: builder.query<ApiResponse<any>, string>({
            query: (queryString) => API.CLIENT_GET_ALL_PRODUCT + "?" + queryString,
        }),
        getLaptop: builder.query<ApiResponse<any>, string>({
            query: (queryString) => API.CLIENT_GET_PRODUCT_LAPTOP + "?" + queryString,
        }),
        getDesktop: builder.query<ApiResponse<any>, string>({
            query: (queryString) => API.CLIENT_GET_PRODUCT_DESKTOP + "?" + queryString,
        }),
        getNetworking: builder.query<ApiResponse<any>, string>({
            query: (queryString) => API.CLIENT_GET_PRODUCT_NETWORKING + "?" + queryString,
        }),
        getPrinter: builder.query<ApiResponse<any>, string>({
            query: (queryString) => API.CLIENT_GET_PRODUCT_PRINTER + "?" + queryString,
        }),
        getPart: builder.query<ApiResponse<any>, string>({
            query: (queryString) => API.CLIENT_GET_PRODUCT_PART + "?" + queryString,
        }),
        getCamera: builder.query<ApiResponse<any>, string>({
            query: (queryString) => API.CLIENT_GET_PRODUCT_CAMERA + "?" + queryString,
        }),
        getSmartphone: builder.query<ApiResponse<any>, string>({
            query: (queryString) => API.CLIENT_GET_PRODUCT_SMARTPHONE + "?" + queryString,
        }),

        getDetailProduct: builder.query<ApiResponse<any>, { id: string }>({
            query: ({ id }) => API.DETAIL_PRODUCT.replace(":id", id),
        }),

        deleteProduct: builder.mutation<ApiResponse<any>, string>({
            query: (id) => ({
                url: API.DELETE_PRODUCT.replace(":id", id),
                method: "DELETE",
            }),
        }),

        updateProduct: builder.mutation<
            ApiResponse<any>,
            {
                name: string;
                price: string;
                description: string;
                id: string;
                image: any;
                brand_id: string;
                product_type_id: string;
            }
        >({
            query(data) {
                let formData = new FormData();
                formData.append("id", data.id);
                formData.append("name", data.name);
                formData.append("price", data.price);
                formData.append("brand_id", data.brand_id);
                formData.append("product_type_id", data.product_type_id);
                formData.append("description", data.description ? data.description : "");
                if (data.image && data.image.fileList.length > 0) {
                    formData.append("image", data.image.fileList[0].originFileObj);
                }
                console.log(data.id);
                return {
                    url: API.UPDATE_PRODUCT.replace(":id", data.id),
                    method: "POST",
                    body: formData,
                };
            },
        }),

        addProduct: builder.mutation<
            ApiResponse<any>,
            {
                name: string;
                price: string;
                description: string;
                image: any;
                brand_id: string;
                product_type_id: string;
            }
        >({
            query(data) {
                let formData = new FormData();
                formData.append("name", data.name);
                formData.append("price", data.price);
                formData.append("brand_id", data.brand_id);
                formData.append("product_type_id", data.product_type_id);
                formData.append("description", data.description ? data.description : "");
                if (data.image && data.image.fileList.length > 0) {
                    formData.append("image", data.image.fileList[0].originFileObj);
                }
                return {
                    url: API.ADD_PRODUCT,
                    method: "POST",
                    body: formData,
                };
            },
        }),
    }),
});

export const {
    useGetLaptopQuery,
    useGetCameraQuery,
    useGetDesktopQuery,
    useGetNetworkingQuery,
    useGetPartQuery,
    useGetPrinterQuery,
    useGetSmartphoneQuery,
    useGetDetailProductQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useAddProductMutation,
    useGetAllQuery,
} = productApi;
