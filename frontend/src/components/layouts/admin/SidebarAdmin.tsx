import SidebarConfigs, { SidebarConfigTypeCheck } from "@/configs/sidebar.config";
import { Menu } from "antd";
import SidebarItem from "@/components/layouts/admin/SidebarItem";

const SidebarAdmin = () => {
    const selectedKeys = [];
    const openKeys = [];

    for (const name of Object.keys(SidebarConfigs)) {
        const sidebarConfig = SidebarConfigs[name];
        if (SidebarConfigTypeCheck.isSidebarConfigSubMenu(sidebarConfig)) {
            for (const childName of Object.keys(sidebarConfig.items)) {
                if (location.pathname === sidebarConfig.items[childName].route.path) {
                    selectedKeys.push(childName);
                    openKeys.push(name);
                    break;
                }
                if (openKeys.length > 0) break;
            }
        }
        if (SidebarConfigTypeCheck.isSidebarConfigMenuItem(sidebarConfig)) {
            if (location.pathname === sidebarConfig.route.path) {
                selectedKeys.push(name);
                break;
            }
        }
    }

    return (
        <div>
            <Menu mode="inline" theme="light" defaultSelectedKeys={selectedKeys} defaultOpenKeys={openKeys}>
                {Object.keys(SidebarConfigs).map((name, index) => (
                    <SidebarItem item={SidebarConfigs[name]} key={"sidebar-item-" + index} navKey={name} />
                ))}
            </Menu>
        </div>
    );
};

export default SidebarAdmin;
