import NotificationIcon from "@/components/icons/NotificationIcon";
import SettingThemeIcon from "@/components/icons/SettingThemeIcon";

const HeaderAdmin = () => {
    return (
        <div className="d-flex justify-flex-end items-center h-64 bg-white">
            <div className="pr-64">
                <SettingThemeIcon size={32} />
                <NotificationIcon size={32} />
            </div>
        </div>
    );
};

export default HeaderAdmin;
