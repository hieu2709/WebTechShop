import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Spin } from "antd";
import RouteConfig from "@/configs/route.config";
import { useVerifyNewEmailUserMutation } from "@/pages/user/user.api";

const VerifyNewEmail = () => {
    const [verifyChangeEmailUser, { isLoading }] = useVerifyNewEmailUserMutation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const fetchApi = async () => {
        const data = await verifyChangeEmailUser(searchParams.toString()).unwrap();
        if (data.success) {
            navigate(RouteConfig.VERIFY_NEW_EMAIL_SUCCESS.path);
        }
    };

    useEffect(() => {
        fetchApi().catch(() => {
            navigate(RouteConfig.VERIFY_NEW_EMAIL_FAILED.path);
        });
    }, []);

    return <>{isLoading && <Spin />}</>;
};
export default VerifyNewEmail;
