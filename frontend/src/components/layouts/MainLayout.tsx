import { connect } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppState } from "@/store";
import RouteConfig from "@/configs/route.config";
import RootPage from "@/pages/RootPage";
import { User } from "@/types/models/user";
import { allowedAdminPage, allowedClientPage } from "@/helpers/role.helper";
import LayoutAdmin from "@/components/layouts/admin/LayoutAdmin";
import LayoutClient from "@/components/layouts/client/LayoutClient";

const mapState = (state: AppState) => ({
    authenticated: state.auth.user !== null,
    user: state.auth.user,
});
type Props = {
    authenticated: boolean;
    user: User;
};

const navigate404 = <Navigate to="/404" />;
const MainLayout = ({ authenticated, user }: Props) => {
    if (!authenticated) {
        return <Navigate to={RouteConfig.LOGIN.path} />;
    }

    return (
        <Routes>
            <Route path="/" element={<RootPage user={user} />} />
            <Route path="/*" element={allowedAdminPage(user) ? <LayoutAdmin /> : navigate404} />
            <Route path="/*" element={allowedClientPage(user) ? <LayoutClient /> : navigate404} />
            <Route path="*" element={<div>Not found</div>} />
        </Routes>
    );
};

export default connect(mapState, null)(MainLayout);
