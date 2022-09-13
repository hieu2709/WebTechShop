import RouteComponentConfig from "@/configs/route_components.config";
import { Route, Routes } from "react-router-dom";
import RouteConfig from "@/configs/route.config";

const LayoutClient = () => {
    return (
        <div>
            <Routes>
                {RouteComponentConfig.private.map((r) => {
                    const Component = r.component;
                    return <Route key={r.name} path={RouteConfig[r.name].path} element={<Component />} />;
                })}
                <Route path="*" element={<div>Not found</div>} />
            </Routes>
        </div>
    );
};

export default LayoutClient;
