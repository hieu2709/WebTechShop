import Loader from "@/components/loader/Loader";
import { Row } from "antd";

type Props = {
    message?: string;
};

const PageLoader = ({ message }: Props) => {
    return (
        <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Row justify="center" align="middle">
                <Loader message={message} />
            </Row>
        </div>
    );
};

export default PageLoader;
