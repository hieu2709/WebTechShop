import RouteConfig, { RouteInfo } from "@/configs/route.config";

export type SidebarConfigMenuItem = {
    route: RouteInfo;
    customName?: string;
    icon?: any;
};

export type SidebarConfigSubMenu = {
    title: string;
    items: { [key: string]: SidebarConfigMenuItem };
    icon?: any;
};

export const SidebarConfigTypeCheck = {
    isSidebarConfigSubMenu(object: unknown): object is SidebarConfigSubMenu {
        return typeof object === "object" && object != null && "items" in object;
    },
    isSidebarConfigMenuItem(object: unknown): object is SidebarConfigMenuItem {
        return typeof object === "object" && object != null && "route" in object;
    },
};

const SidebarConfigs: { [key: string]: SidebarConfigSubMenu | SidebarConfigMenuItem } = {
    USER: {
        title: "Quản lí người dùng",
        items: {
            ADMIN_USER: {
                route: RouteConfig.ADMIN_USER,
                customName: "Danh sách người dùng",
            },
        },
    },
    ORDER: {
        title: "Quản lí đơn hàng",
        items: {
            ADMIN_ORDER: {
                route: RouteConfig.ADMIN_ORDER,
                customName: "Danh sách đơn hàng",
            },
        },
    },
    PRODUCT: {
        title: "Quản lí sản phẩm",
        items: {
            ADMIN_PRODUCT_LAPTOP: {
                route: RouteConfig.ADMIN_PRODUCT_LAPTOP,
                customName: "Laptop",
            },
            ADMIN_PRODUCT_DESKTOP_PC: {
                route: RouteConfig.ADMIN_PRODUCT_DESKTOP_PC,
                customName: "Desktop PCs",
            },
            ADMIN_PRODUCT_NETWORKING_DEVICE: {
                route: RouteConfig.ADMIN_PRODUCT_NETWORKING_DEVICE,
                customName: "Networking devices",
            },
            ADMIN_PRODUCT_PRINTER: {
                route: RouteConfig.ADMIN_PRODUCT_PRINTER,
                customName: "Printer & Scanner",
            },
            ADMIN_PRODUCT_PC_PART: {
                route: RouteConfig.ADMIN_PRODUCT_PC_PART,
                customName: "PC Parts",
            },
            ADMIN_PRODUCT_SMART_PHONE: {
                route: RouteConfig.ADMIN_PRODUCT_SMART_PHONE,
                customName: "Smartphone",
            },
            ADMIN_PRODUCT_CAMERA: {
                route: RouteConfig.ADMIN_PRODUCT_CAMERA,
                customName: "Cameras",
            },
        },
    },
};

export default SidebarConfigs;
