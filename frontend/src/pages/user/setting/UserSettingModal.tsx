import { Tabs } from "antd";
import MModal from "@/components/modal/MModal";
import UserProfile from "@/pages/user/setting/UserProfile";
import { User } from "@/types/models/user";
import UserChangeAccount from "@/pages/user/setting/change_account/UserChangeAccount";

type Props = {
    user: User;
    isShow: boolean;
    onClose: () => void;
};

const UserSettingModal = ({ user, onClose, isShow }: Props) => {
    const { TabPane } = Tabs;

    return (
        <MModal className="w-500" title="Cài đặt" visible={isShow} footer={null} onOk={onClose} onCancel={onClose}>
            <div className="pl-16 pr-16">
                <Tabs defaultActiveKey="profile">
                    <TabPane tab="Thông tin cơ bản" key="profile">
                        <UserProfile onClose={onClose} user={user} />
                    </TabPane>
                    <TabPane tab="Tài khoản" key="account">
                        <UserChangeAccount onClose={onClose} user={user} />
                    </TabPane>
                </Tabs>
            </div>
        </MModal>
    );
};

export default UserSettingModal;
