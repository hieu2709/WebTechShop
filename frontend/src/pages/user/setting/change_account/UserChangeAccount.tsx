import { Row } from "antd";
import { useState } from "react";
import { User } from "@/types/models/user";
import "../index.scss";
import ChangePasswordModal from "@/pages/user/setting/change_account/ChangePasswordModal";
import ChangeEmailModal from "@/pages/user/setting/change_account/ChangeEmailModal";

type Props = {
    user: User;
    onClose: () => void;
};

const UserChangeAccount = ({ user }: Props) => {
    const [isShowChangeEmailModal, setIsShowChangeEmailModal] = useState<boolean>(false);
    const [isShowChangePasswordModal, setIsShowChangePasswordModal] = useState<boolean>(false);

    return (
        <div className="pb-16">
            <div className="pb-32">
                <div className="text-gray-100 fw-500 mb-8">Địa chỉ Email</div>
                <Row>
                    <div className="text-gray-100 fw-400 mr-24">{user?.email}</div>
                    <div
                        className="text-blue-100 cursor-pointer fs-14 fw-400 text-decoration-underline"
                        onClick={() => setIsShowChangeEmailModal(true)}
                    >
                        Thay đổi
                    </div>
                </Row>
            </div>
            <div className="fw-500 text-gray-100 fs-14">Mật khẩu</div>
            <Row className="d-flex items-center">
                <div className="mr-20 fs-32">••••••••</div>

                <div
                    className="text-blue-100 cursor-pointer fs-14 fw-400 text-decoration-underline"
                    onClick={() => setIsShowChangePasswordModal(true)}
                >
                    Thay đổi
                </div>
            </Row>

            <ChangeEmailModal isShow={isShowChangeEmailModal} onClose={() => setIsShowChangeEmailModal(false)} />
            <ChangePasswordModal
                isShow={isShowChangePasswordModal}
                onClose={() => setIsShowChangePasswordModal(false)}
            />
        </div>
    );
};

export default UserChangeAccount;
