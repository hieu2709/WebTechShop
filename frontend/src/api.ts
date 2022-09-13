import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API } from "@/configs/api.config";

export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API.BASE,
        prepareHeaders: (headers) => {
            headers.set("Accept", "application/json");
            return headers;
        },
        credentials: "include",
    }),
    endpoints: (builder) => ({}),
    tagTypes: ["project", "project-file"],
});
