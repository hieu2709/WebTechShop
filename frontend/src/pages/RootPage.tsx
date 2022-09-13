import { useEffect } from "react";
import { User } from "@/types/models/user";
import { hasRole } from "@/helpers/role.helper";
import RoleEnum from "@/enums/role.enum";
import { useNavigate } from "react-router-dom";
import RouteConfig from "@/configs/route.config";
import { AppState } from "@/store";
import { connect } from "react-redux";

const mapState = (state: AppState) => ({
    user: state.auth.user,
});

type Props = {
    user: User;
};

const RootPage = ({ user }: Props) => {
    const navigate = useNavigate();

    const rootRedirect = (user: User) => {
        if (hasRole(user, RoleEnum.ADMIN.value)) {
            navigate(RouteConfig.ADMIN_USER.path);
        } else if (hasRole(user, RoleEnum.USER.value)) {
            navigate(RouteConfig.HOME.path);
        } else {
            navigate("/home");
        }
    };

    useEffect(() => {
        rootRedirect(user);
    });
    return <></>;
};

export default connect(mapState, null)(RootPage);
