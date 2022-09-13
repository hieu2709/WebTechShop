import { Col, Form, Input, Row } from "antd";
import "./index.scss";
import MButton from "@/components/button/MButton";
import PasswordInput from "@/pages/auth/components/PasswordInput";
import { useState } from "react";
import FormHelper from "@/helpers/form.helper";
import RouteConfig from "@/configs/route.config";
import ApiHelper from "@/helpers/api.helper";
import { Navigate, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@/pages/auth/auth.api";
import { AppState } from "@/store";
import { User } from "@/types/models/user";
import { connect } from "react-redux";
import BackIcon from "@/components/icons/BackIcon";

const mapState = (state: AppState) => ({
    user: state.auth.user,
});

type Props = {
    user: User | null;
};

const Register = ({ user }: Props) => {
    const [isFormValid, setIsFormValid] = useState(false);

    if (user) {
        return <Navigate to={"/"} />;
    }

    const initialValues = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    };

    const [form] = Form.useForm();

    const validateMessages = {
        required: "Vui lòng nhập ${label}",
        types: {
            email: "Vui lòng kiểm tra dạng ${label}",
        },
    };

    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    return (
        <div className="register d-flex justify-center items-center bg-gray-10 flex-direction-column">
            <div className="border-radius-md p-32 bg-white w-500">
                <Row className="text-left fs-18 mb-16 text-gray-100 fw-700" justify="center" align="middle">
                    ĐĂNG KÝ TÀI KHOẢN
                </Row>

                <Row justify="center" align="middle">
                    <div>
                        <Form
                            layout="vertical"
                            requiredMark={false}
                            form={form}
                            initialValues={initialValues}
                            validateTrigger={false}
                            validateMessages={validateMessages}
                            onValuesChange={async () => {
                                const result = await FormHelper.validateFields(form, [
                                    "email",
                                    "first_name",
                                    "last_name",
                                    "password",
                                ]);
                                setIsFormValid(result);
                            }}
                            onFinish={async (values) => {
                                try {
                                    await register(values).unwrap();
                                    form.resetFields();
                                    navigate(RouteConfig.REGISTER_COMPLETE.path);
                                } catch (e) {
                                    if (ApiHelper.isValidationError(e)) {
                                        FormHelper.setFormErrors(e, form);
                                    }
                                }
                            }}
                        >
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item name="last_name" label="Họ" rules={[{ required: true }]}>
                                        <Input className="w100p" placeholder="Họ" />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item name="first_name" label="Tên" rules={[{ required: true }]}>
                                        <Input className="w100p" placeholder="Tên" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item name="email" label="Email" rules={[{ type: "email", required: true }]}>
                                        <Input className="w100p" placeholder="sample@gmail.com" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={24}>
                                    <PasswordInput name="password" label="Mật Khẩu" />
                                </Col>
                            </Row>

                            <Row justify="center" align="middle" className="mb-16">
                                <MButton
                                    block
                                    type="primary"
                                    htmlType="submit"
                                    disabled={!isFormValid}
                                    loading={isLoading}
                                >
                                    ĐĂNG KÝ
                                </MButton>
                            </Row>
                            <Row>
                                <div
                                    className="d-flex justify-center items-center cursor-pointer"
                                    onClick={() => navigate(RouteConfig.LOGIN.path)}
                                >
                                    <BackIcon size={16} />
                                    <span className="ml-12">Quay lại trang đăng nhập</span>
                                </div>
                            </Row>
                        </Form>
                    </div>
                </Row>
            </div>
        </div>
    );
};
export default connect(mapState, null)(Register);
