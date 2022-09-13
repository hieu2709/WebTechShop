import { Result } from "antd";
import { ReactNode } from "react";
import MButton from "@/components/button/MButton";
import RouteConfig from "@/configs/route.config";

type Props = {
    title?: string;
    message?: string;
    extra?: ReactNode;
};

const SuccessResult = ({ title, message, extra }: Props) => {
    return (
        <Result
            status="success"
            title={title || "Success"}
            subTitle={message}
            extra={
                extra || [
                    <MButton type="primary" key="home" link={RouteConfig.HOME.path}>
                        Go to home
                    </MButton>,
                ]
            }
        />
    );
};

export default SuccessResult;
