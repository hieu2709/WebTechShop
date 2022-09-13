// const viteBase = import.meta.env.VITE_API_BASE_URL;

const viteBase = "http://localhost:8000/api/";

export const API = {
    BASE: viteBase,

    AUTH_LOGIN: "auth/login",
    AUTH_CHECK: "auth/check",
    AUTH_LOGOUT: "auth/logout",
    REGISTER: "register",

    USER_CHANGE_PASSWORD: "profile/change-password",
    USER_UPDATE_PROFILE: "profile/update",
    USER_UPDATE_AVATAR: "profile/avatar",
    USER_CHANGE_EMAIL: "profile/email/change",

    //cart
    ADD_TO_CART: "cart/add",
    GET_CART: "cart",
    REMOVE_CART_ITEM: "cart/remove",
    EMPTY_CART: "cart",

    //product
    DETAIL_PRODUCT: "product/:id",
    UPDATE_PRODUCT: "product/:id",
    DELETE_PRODUCT: "product/:id",
    ADD_PRODUCT: "product",

    CLIENT_GET_ALL_PRODUCT: "product/all",
    CLIENT_GET_PRODUCT_LAPTOP: "product/laptop",
    CLIENT_GET_PRODUCT_DESKTOP: "product/desktop",
    CLIENT_GET_PRODUCT_NETWORKING: "product/networking",
    CLIENT_GET_PRODUCT_PRINTER: "product/printer",
    CLIENT_GET_PRODUCT_PART: "product/part",
    CLIENT_GET_PRODUCT_SMARTPHONE: "product/smartphone",
    CLIENT_GET_PRODUCT_CAMERA: "product/camera",
};
