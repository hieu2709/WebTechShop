import { Row, Spin } from "antd";

type Props = {
    message?: string;
};

const Loader = ({ message }: Props) => {
    return (
        <Row className="fs-40 fw-400 text-gray-100" justify="center" align="middle">
            <Spin size="large" className="mr-20" />
            {message || "Loading"}
        </Row>
    );
};

export default Loader;
