import { Col, Form, Row } from "antd";
import MButton from "@/components/button/MButton";

type Props = {
    isLoading: boolean;
    isDisabled?: boolean;
    onClose: () => void;
};

const UserSettingButton = ({ isLoading, isDisabled, onClose }: Props) => {
    return (
        <Row gutter={16} className="mt-16">
            <Col span={24}>
                <Form.Item>
                    <MButton loading={isLoading} type="primary" htmlType="submit" disabled={isDisabled}>
                        Xác nhận
                    </MButton>
                    <MButton onClick={() => onClose()} disabled={isLoading} className="ml-16" type="default">
                        Hủy bỏ
                    </MButton>
                </Form.Item>
            </Col>
        </Row>
    );
};

export default UserSettingButton;
