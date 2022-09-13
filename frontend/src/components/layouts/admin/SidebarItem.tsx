import { SidebarConfigMenuItem, SidebarConfigSubMenu, SidebarConfigTypeCheck } from "@/configs/sidebar.config";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

type Props = {
    item: SidebarConfigSubMenu | SidebarConfigMenuItem;
    navKey: string;
};

const { SubMenu } = Menu;

const SidebarItem = ({ item, navKey }: Props) => {
    if (SidebarConfigTypeCheck.isSidebarConfigSubMenu(item)) {
        const items: { [key: string]: SidebarConfigMenuItem } = item.items;

        return (
            <SubMenu
                {...{
                    eventKey: navKey,
                }}
                title={item.title}
            >
                {Object.keys(items).map((name, index) => (
                    <Menu.Item key={name + index} eventKey={name}>
                        <NavLink to={items[name].route.path}>
                            {items[name].customName || items[name].route.name}
                        </NavLink>
                    </Menu.Item>
                ))}
            </SubMenu>
        );
    }

    if (SidebarConfigTypeCheck.isSidebarConfigMenuItem(item)) {
        return (
            <Menu.Item eventKey={navKey} icon={<item.icon />}>
                <NavLink to={item.route.path}>{item.customName || item.route.name}</NavLink>
            </Menu.Item>
        );
    }

    return <></>;
};

export default SidebarItem;
