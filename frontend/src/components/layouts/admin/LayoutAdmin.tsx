import SidebarAdmin from "@/components/layouts/admin/SidebarAdmin";
import { Route, Routes } from "react-router-dom";
import RouteComponentConfig from "@/configs/route_components.config";
import RouteConfig from "@/configs/route.config";
import { Layout } from "antd";
import HeaderAdmin from "@/components/layouts/admin/HeaderAdmin";
import MButton from "@/components/button/MButton";
import "./index.scss";
import NotificationHelper from "@/helpers/notification.helper";
import { useLogoutMutation } from "@/pages/auth/auth.api";

const { Sider, Content } = Layout;

const LayoutAdmin = () => {
    const [logout] = useLogoutMutation();

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider className="bg-white w100p pb-12">
                <SidebarAdmin />
                <MButton
                    type="primary"
                    onClick={async () => {
                        try {
                            await logout().unwrap();
                            NotificationHelper.showSuccess({
                                description: "Đăng xuất thành công !",
                            });
                        } catch (e) {
                            NotificationHelper.showError({
                                description: "Đăng xuất thất bại !",
                            });
                        }
                    }}
                >
                    ĐĂNG XUẤT
                </MButton>
            </Sider>

            <Layout>
                <HeaderAdmin />
                <div style={{ overflow: "auto", maxHeight: "90vh" }}>
                    <Content>
                        <Routes>
                            {RouteComponentConfig.private.map((r) => {
                                const Component = r.component;
                                return <Route key={r.name} path={RouteConfig[r.name].path} element={<Component />} />;
                            })}
                            <Route path="*" element={<div>Not found</div>} />
                        </Routes>
                    </Content>
                </div>
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;
