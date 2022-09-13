import { Checkbox, Col, Form, Input, Row } from "antd";
import "./index.scss";
import MButton from "@/components/button/MButton";
import { useState } from "react";
import FormHelper from "@/helpers/form.helper";
import RouteConfig from "@/configs/route.config";
import ApiHelper from "@/helpers/api.helper";
import { Navigate, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/pages/auth/auth.api";
import { AppState } from "@/store";
import { User } from "@/types/models/user";
import { connect } from "react-redux";

const mapState = (state: AppState) => ({
    user: state.auth.user,
});

type Props = {
    user: User;
};

const Login = ({ user }: Props) => {
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [login, { isLoading }] = useLoginMutation();

    if (user) {
        return <Navigate to={RouteConfig.HOME.path} />;
    }

    const validateMessages = {
        required: "Vui lòng nhập ${label}",
        types: {
            email: "Vui lòng kiểm tra dạng ${label}",
        },
    };

    return (
        <div className="login d-flex justify-center items-center bg-gray-10 flex-direction-column">
            <div className="border-radius-md p-32 bg-white w-500">
                <Row className="text-left fs-18 fw-700 mb-16 text-gray-100" justify="center" align="middle">
                    ĐĂNG NHẬP
                </Row>

                <Row justify="center" align="middle">
                    <div>
                        <Form
                            layout="vertical"
                            requiredMark={false}
                            form={form}
                            validateTrigger={false}
                            validateMessages={validateMessages}
                            onValuesChange={async () => {
                                const result = await FormHelper.validateFields(form, ["email", "password"]);
                                setIsFormValid(result);
                            }}
                            onFinish={async (values) => {
                                try {
                                    await login(values).unwrap();
                                    form.resetFields();
                                    navigate(RouteConfig.ROOT_PAGE.path);
                                } catch (e) {
                                    if (ApiHelper.isValidationError(e)) {
                                        FormHelper.setFormErrors(e, form);
                                    }
                                }
                            }}
                        >
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item name="email" label="Email" rules={[{ type: "email", required: true }]}>
                                        <Input className="w-400" placeholder="sample@gmail.com" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]}>
                                        <Input.Password className="w-400" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <div className="fw-500 fs-17 text-decoration-underline mb-16">Quên mật khẩu ? </div>
                            <Row>
                                <Form.Item name="remember" valuePropName="checked">
                                    <Checkbox>Nhớ thông tin đăng nhập</Checkbox>
                                </Form.Item>
                            </Row>

                            <Row justify="center" align="middle" className="mb-16 mt-16">
                                <MButton
                                    block
                                    loading={isLoading}
                                    type="primary"
                                    htmlType="submit"
                                    disabled={!isFormValid}
                                >
                                    ĐĂNG NHẬP
                                </MButton>
                            </Row>
                            <Row justify="center" align="middle" className="mb-16 mt-16">
                                <MButton
                                    type="dashed"
                                    className="w100p"
                                    onClick={() => navigate(RouteConfig.REGISTER.path)}
                                >
                                    ĐĂNG KÝ
                                </MButton>
                            </Row>
                        </Form>
                    </div>
                </Row>
            </div>
        </div>
    );
};

export default connect(mapState, null)(Login);
