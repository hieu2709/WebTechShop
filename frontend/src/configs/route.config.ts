export type RouteName =
    | "LOGIN"
    | "HOME"
    | "REGISTER"
    | "REGISTER_COMPLETE"
    | "VERIFY"
    | "VERIFY_NEW_EMAIL_SUCCESS"
    | "VERIFY_NEW_EMAIL_FAILED"
    | "SHOPPING_CART"
    | "ADMIN_PRODUCT_LAPTOP"
    | "ADMIN_PRODUCT_DESKTOP_PC"
    | "ADMIN_PRODUCT_NETWORKING_DEVICE"
    | "ADMIN_PRODUCT_PRINTER"
    | "ADMIN_PRODUCT_PC_PART"
    | "ADMIN_PRODUCT_SMART_PHONE"
    | "ADMIN_PRODUCT_CAMERA"
    | "ADMIN_ORDER"
    | "ADMIN_USER"
    | "PRODUCT_DETAIL"
    | "ADMIN_HOME"
    | "ROOT_PAGE"
    | "DETAIL_PRODUCT_MANAGE";
export type RouteInfo = {
    path: string;
    name: string;
};

const RouteConfig: { [name in RouteName]: RouteInfo } = {
    LOGIN: {
        path: "/login",
        name: "Login",
    },
    ROOT_PAGE: {
        path: "/",
        name: "Root",
    },
    HOME: {
        path: "/home",
        name: "Home",
    },
    REGISTER: {
        path: "/register",
        name: "Register",
    },
    REGISTER_COMPLETE: {
        path: "/register/complete",
        name: "Register complete",
    },
    VERIFY: {
        path: "/accounts/verify",
        name: "Verify account",
    },
    VERIFY_NEW_EMAIL_SUCCESS: {
        path: "/change-email/verify/success",
        name: "Verify new email success",
    },
    VERIFY_NEW_EMAIL_FAILED: {
        path: "/change-email/verify/failed",
        name: "Verify new email failed",
    },
    SHOPPING_CART: {
        path: "/cart",
        name: "Shopping cart",
    },
    PRODUCT_DETAIL: {
        path: "/product/:id",
        name: "Detail product",
    },

    // ADMIN
    ADMIN_HOME: {
        path: "/admin/home",
        name: "Home admin",
    },
    ADMIN_PRODUCT_LAPTOP: {
        path: "/admin/product/laptop",
        name: "Laptop",
    },
    ADMIN_PRODUCT_DESKTOP_PC: {
        path: "/admin/product/desktop-pc",
        name: "Desktop PC",
    },
    ADMIN_PRODUCT_NETWORKING_DEVICE: {
        path: "/admin/product/networking-device",
        name: "Networking device",
    },
    ADMIN_PRODUCT_PRINTER: {
        path: "/admin/product/printer",
        name: "Printer",
    },
    ADMIN_PRODUCT_PC_PART: {
        path: "/admin/product/pc-part",
        name: "PC Part",
    },
    ADMIN_PRODUCT_SMART_PHONE: {
        path: "/admin/product/smartphone",
        name: "Smartphone",
    },
    ADMIN_PRODUCT_CAMERA: {
        path: "/admin/product/camera",
        name: "Camera",
    },
    ADMIN_ORDER: {
        path: "/admin/order",
        name: "Camera",
    },
    ADMIN_USER: {
        path: "/admin/user",
        name: "Camera",
    },
    DETAIL_PRODUCT_MANAGE: {
        path: "/admin/product/:id",
        name: "Camera",
    },
};

export default RouteConfig;
