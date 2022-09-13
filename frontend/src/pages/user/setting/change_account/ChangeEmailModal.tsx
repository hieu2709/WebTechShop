import { useState } from "react";
import { Form, Input } from "antd";
import FormHelper from "@/helpers/form.helper";
import NotificationHelper from "@/helpers/notification.helper";
import ApiHelper from "@/helpers/api.helper";
import MModal from "@/components/modal/MModal";
import MButton from "@/components/button/MButton";
import { useChangeEmailUserMutation, useResendEmailMutation } from "@/pages/user/user.api";
import VerifyEmailSentNotification from "@/pages/user/setting/change_account/VerifyEmailSentNotification";

type Props = {
    isShow: boolean;
    onClose: () => void;
};

const ChangeEmailModal = ({ isShow, onClose }: Props) => {
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [changeEmailUser, { isLoading: isLoading }] = useChangeEmailUserMutation();
    const [resendEmail, { isLoading: isLoadingResend }] = useResendEmailMutation();

    const initialValues = {
        new_email: "",
    };

    const validateMessages = {
        required: "Please enter all the information",
        types: {
            email: "Please check format of your new email",
        },
    };

    const onResend = async () => {
        try {
            await resendEmail().unwrap();
            NotificationHelper.showSuccess({
                description: "We have resent you an email for verification.",
            });
        } catch (e) {
            NotificationHelper.showError({
                description: "Could not resend email. Please contact administrator.",
            });
        }
    };

    return (
        <MModal
            title="Thay đổi email"
            className="w-344"
            footer={null}
            onOk={onClose}
            onCancel={onClose}
            visible={isShow}
        >
            <div className="pb-16 pl-16 pr-16">
                <div className="fs-14 fw-400 text-gray-100 mb-16">
                    Vui lòng nhập địa chỉ email mới mà bạn muốn thay đổi. Một email xác thực sẽ được gửi đến đây địa chỉ
                    email.
                </div>
                <Form
                    form={form}
                    layout="vertical"
                    requiredMark={false}
                    initialValues={initialValues}
                    validateTrigger={false}
                    validateMessages={validateMessages}
                    onValuesChange={async () => {
                        const result = await FormHelper.validateFields(form, ["new_email"]);
                        setIsFormValid(result);
                    }}
                    onFinish={async (value) => {
                        try {
                            await changeEmailUser(value).unwrap();
                            form.resetFields();
                            NotificationHelper.showInfo({
                                description: (
                                    <VerifyEmailSentNotification isResending={isLoadingResend} resend={onResend} />
                                ),
                            });
                            onClose();
                        } catch (e) {
                            if (ApiHelper.isValidationError(e)) {
                                FormHelper.setFormErrors(e, form);
                            }
                        }
                    }}
                >
                    <Form.Item name="new_email" rules={[{ type: "email", required: true }]}>
                        <Input placeholder="New mail address" />
                    </Form.Item>
                    <div className="mt-8">
                        <MButton loading={isLoading} type="primary" htmlType="submit" disabled={!isFormValid}>
                            Gửi
                        </MButton>
                        <MButton className="ml-16" onClick={() => onClose()}>
                            Hủy bỏ
                        </MButton>
                    </div>
                </Form>
            </div>
        </MModal>
    );
};

export default ChangeEmailModal;
