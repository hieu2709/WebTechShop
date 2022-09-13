import MModal from "@/components/modal/MModal";
import { Col, Form, Input, Row } from "antd";
import PasswordInput from "@/pages/auth/components/PasswordInput";
import NotificationHelper from "@/helpers/notification.helper";
import ApiHelper from "@/helpers/api.helper";
import FormHelper from "@/helpers/form.helper";
import { useState } from "react";
import { useChangePasswordUserMutation } from "@/pages/user/user.api";
import UserSettingButton from "@/pages/user/setting/components/UserSettingButton";

type Props = {
    isShow: boolean;
    onClose: () => void;
};

const ChangePasswordModal = ({ isShow, onClose }: Props) => {
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [changePasswordUser, { isLoading: isLoading }] = useChangePasswordUserMutation();
    const [form] = Form.useForm();

    const initialValues = {
        current_password: "",
        password: "",
    };

    const validateMessages = {
        required: "Please enter all the information",
    };
    return (
        <MModal
            title="Thay đổi mật khẩu"
            className="w-324"
            footer={null}
            onOk={onClose}
            onCancel={onClose}
            visible={isShow}
        >
            <div className="px-16">
                <div className="fs-14 fw-400 text-gray-100 mb-16">
                    Nhập mật khẩu hiện tại của bạn và mật khẩu mới mà bạn muốn thay đổi.
                </div>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={async (value) => {
                        try {
                            await changePasswordUser(value).unwrap();
                            form.resetFields();
                            NotificationHelper.showSuccess({
                                description: "Successfully updated password",
                            });
                            onClose();
                        } catch (e) {
                            if (ApiHelper.isValidationError(e)) {
                                FormHelper.setFormErrors(e, form);
                            }
                        }
                    }}
                    requiredMark={false}
                    initialValues={initialValues}
                    validateTrigger={false}
                    validateMessages={validateMessages}
                    onValuesChange={async () => {
                        const result = await FormHelper.validateFields(form, ["current_password", "new_password"]);
                        setIsFormValid(result);
                    }}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="current_password"
                                rules={[{ required: true }]}
                                className="current-password"
                            >
                                <Input type="password" placeholder="Mật khẩu cũ" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <PasswordInput placeholder="New Password" name="Mật khẩu mới" />
                        </Col>
                    </Row>
                    <UserSettingButton isLoading={isLoading} onClose={onClose} isDisabled={!isFormValid} />
                </Form>
            </div>
        </MModal>
    );
};

export default ChangePasswordModal;
