import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteComponentConfig from "@/configs/route_components.config";
import RouteConfig from "@/configs/route.config";
import MainLayout from "@/components/layouts/MainLayout";
import { useAuthCheckMutation } from "@/pages/auth/auth.api";
import "@/styles/app.scss";
import PageLoader from "@/components/loader/PageLoader";
import LayoutAdmin from "@/components/layouts/admin/LayoutAdmin";

function App() {
    const [authCheck, authCheckData] = useAuthCheckMutation();
    useEffect(() => {
        authCheck();
    }, []);

    if (authCheckData.isLoading || authCheckData.isUninitialized) {
        return <PageLoader />;
    }

    return (
        <BrowserRouter>
            <Routes>
                {RouteComponentConfig.public.map((r) => {
                    const Component = r.component;
                    return <Route key={r.name} path={RouteConfig[r.name].path} element={<Component />} />;
                })}
                <Route path="*" element={<MainLayout />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
