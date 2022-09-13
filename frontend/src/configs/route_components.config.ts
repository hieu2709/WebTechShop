import { RouteName } from "@/configs/route.config";
import Login from "@/pages/auth/Login/Login";
import Home from "@/pages/home/Home";
import Register from "@/pages/auth/Register/Register";
import RegisterComplete from "@/pages/auth/Register/RegisterComplete";
import VerifyAccount from "@/pages/auth/Register/VerifyAccount";
import ShoppingCart from "@/pages/client/cart/ShoppingCart";
import ManageListLaptop from "@/pages/admin/products/laptop/ManageListLaptop";
import ManageListDesktop from "@/pages/admin/products/desktop_pc/ManageListDesktop";
import ManageListNetworkingDevice from "@/pages/admin/products/networking_device/ManageListNetworkingDevice";
import ManageListPrinter from "@/pages/admin/products/printer/ManageListPrinter";
import ManagerListPCPart from "@/pages/admin/products/pc_part/ManagerListPCPart";
import ManageListSmartphone from "@/pages/admin/products/smartphone/ManageListSmartphone";
import ManagerListCamera from "@/pages/admin/products/camera/ManagerListCamera";
import ManageListOrder from "@/pages/admin/order/ManageListOrder";
import ManageListUser from "@/pages/admin/user/ManageListUser";
import ProductDetail from "@/components/products/ProductDetail";
import RootPage from "@/pages/RootPage";
import DetailProductManage from "@/pages/admin/products/DetailProductManage";

const RouteComponentConfig: {
    public: { name: RouteName; component: any }[];
    private: { name: RouteName; component: any }[];
} = {
    public: [
        { name: "LOGIN", component: Login },
        { name: "REGISTER", component: Register },
        { name: "HOME", component: Home },
        { name: "REGISTER_COMPLETE", component: RegisterComplete },
        { name: "VERIFY", component: VerifyAccount },
        { name: "PRODUCT_DETAIL", component: ProductDetail },
        { name: "SHOPPING_CART", component: ShoppingCart },
        { name: "ROOT_PAGE", component: RootPage },
    ],
    private: [
        //admin product
        { name: "ADMIN_PRODUCT_LAPTOP", component: ManageListLaptop },
        { name: "ADMIN_PRODUCT_DESKTOP_PC", component: ManageListDesktop },
        { name: "ADMIN_PRODUCT_NETWORKING_DEVICE", component: ManageListNetworkingDevice },
        { name: "ADMIN_PRODUCT_PRINTER", component: ManageListPrinter },
        { name: "ADMIN_PRODUCT_PC_PART", component: ManagerListPCPart },
        { name: "ADMIN_PRODUCT_SMART_PHONE", component: ManageListSmartphone },
        { name: "ADMIN_PRODUCT_CAMERA", component: ManagerListCamera },
        { name: "ADMIN_ORDER", component: ManageListOrder },
        { name: "ADMIN_USER", component: ManageListUser },
        { name: "DETAIL_PRODUCT_MANAGE", component: DetailProductManage },
    ],
};

export default RouteComponentConfig;
