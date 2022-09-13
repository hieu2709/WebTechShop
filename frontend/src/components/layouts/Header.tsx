import { Col, Dropdown, Menu, Row } from "antd";
import LogoIcon from "@/components/icons/LogoIcon";
import MButton from "@/components/button/MButton";
import { useState } from "react";
import MInputSearch from "@/components/input/MInputSearch";
import { User } from "@/types/models/user";
import UserSettingModal from "@/pages/user/setting/UserSettingModal";
import AvatarIcon from "@/components/icons/AvatarIcon";
import NotificationHelper from "@/helpers/notification.helper";
import { useLogoutMutation } from "@/pages/auth/auth.api";
import { useNavigate } from "react-router-dom";
import RouteConfig from "@/configs/route.config";
import MAvatar from "@/components/avatar/MAvatar";
import ImageHelper from "@/helpers/image.helper";
import FbIcon from "@/components/icons/FbIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import CartIcon from "@/components/icons/CartIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import { AppState } from "@/store";
import { connect } from "react-redux";

const mapState = (state: AppState) => ({
    user: state.auth.user,
});

type Props = {
    user: User | null;
};

const Header = ({ user }: Props) => {
    const [isShow, setIsShow] = useState<boolean>(false);
    const [statusInputSearch, setStatusInputSearch] = useState<boolean>(true);
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();

    const menu = (
        <Menu className="py-0">
            <Menu.Item key="user_setting" className="bg-white pt-12">
                <Row>
                    <Col className="d-flex items-center">
                        <AvatarIcon />
                    </Col>
                    <Col className="items-center ml-8">
                        <div className="fs-12 text-gray-100 fw-700">{user?.name}</div>
                        <div className="fs-10 text-gray-80">{user?.email}</div>
                    </Col>
                </Row>
            </Menu.Item>
            <Menu.Item key="btn_setting" className="p-12" onClick={() => setIsShow(true)}>
                Cài Đặt
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
                key="btn_logout"
                className="p-12"
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
                Đăng Xuất
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <div className="h-50 bg-gray-100 text-gray-60 fs-14 fw-500 d-flex justify-space-around items-center">
                <div className="d-flex">
                    Mon-Thu:
                    <div className="text-white ml-4">9:00 AM -- 5:30 PM</div>
                </div>
                <div>Visit our showroom in 55 Giai Phong Street</div>
                <div className="text-white">
                    Call Us : (+84) 98.44.22.555
                    <FbIcon size={16} className="ml-16" />
                    <InstagramIcon size={16} className="ml-16" />
                </div>
            </div>

            <div className="h-100 bg-white d-flex justify-space-around items-center">
                <div className="d-flex items-center">
                    <LogoIcon size={120} />
                    <div className="w100p">
                        {statusInputSearch ? (
                            <></>
                        ) : (
                            <MInputSearch
                                className="ml-80 w-500"
                                placeholder="Nhập từ khóa cần tìm kiếm ..."
                                allowClear={true}
                            />
                        )}
                    </div>
                </div>
                {user ? (
                    <div className="d-flex justify-center items-center">
                        <SearchIcon size={32} onClick={() => setStatusInputSearch(!statusInputSearch)} />
                        <CartIcon
                            size={32}
                            className="ml-16"
                            onClick={() => navigate(RouteConfig.SHOPPING_CART.path)}
                        />
                        <Dropdown trigger={["click"]} overlay={menu} className="ml-16">
                            <MButton type="text" className="d-flex items-center">
                                <MAvatar
                                    text={ImageHelper.getTextAvatar(user.first_name, user.last_name)}
                                    url={!user?.avatar ? null : ImageHelper.getUrlImage(user?.avatar)}
                                    size={32}
                                />
                            </MButton>
                        </Dropdown>
                        <UserSettingModal user={user} isShow={isShow} onClose={() => setIsShow(false)} />
                    </div>
                ) : (
                    <div className="d-flex justify-center items-center">
                        <SearchIcon size={32} onClick={() => setStatusInputSearch(!statusInputSearch)} />

                        <MButton className="mr-32 ml-32" onClick={() => navigate(RouteConfig.LOGIN.path)}>
                            Đăng Nhập
                        </MButton>
                    </div>
                )}
            </div>
        </>
    );
};

export default connect(mapState, {})(Header);
