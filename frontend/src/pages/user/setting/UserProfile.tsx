import { Col, Form, Input, Row } from "antd";
import MButton from "@/components/button/MButton";
import MAvatar from "@/components/avatar/MAvatar";
import { useUpdateAvatarUserMutation, useUpdateProfileUserMutation } from "@/pages/user/user.api";
import ApiHelper from "@/helpers/api.helper";
import { User } from "@/types/models/user";
import FormHelper from "@/helpers/form.helper";
import NotificationHelper from "@/helpers/notification.helper";
import { useRef } from "react";
import EditIcon from "@/components/icons/EditIcon";
import ImageHelper from "@/helpers/image.helper";
import UserSettingButton from "@/pages/user/setting/components/UserSettingButton";

type Props = {
    user: User;
    onClose: () => void;
};

const UserProfile = ({ user, onClose }: Props) => {
    const inputAvatarRef = useRef<HTMLInputElement>(null);
    const [updateProfileUser, { isLoading: isLoading }] = useUpdateProfileUserMutation();
    const [form] = Form.useForm();
    const [updateAvatarUser, { isLoading: isLoadingAvatar }] = useUpdateAvatarUserMutation();

    const initialValues = {
        first_name: user.first_name,
        last_name: user.last_name,
    };

    const validateMessages = {
        required: "validation:Please enter ${label}",
        types: {
            email: "validation:Please check format of your ${label}",
        },
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={async (value) => {
                try {
                    await updateProfileUser(value).unwrap();
                    NotificationHelper.showSuccess({
                        description: "Successfully updated profile",
                    });
                } catch (e) {
                    if (ApiHelper.isValidationError(e)) {
                        FormHelper.setFormErrors(e, form);
                    }
                }
            }}
            requiredMark={false}
            validateMessages={validateMessages}
            initialValues={initialValues}
        >
            <div className="pt-16">
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item className="d-flex" label="Cài đặt">
                            <Row>
                                <Col>
                                    <div className="avatar-container bg-gray-70 position-relative">
                                        <MAvatar
                                            text={ImageHelper.getTextAvatar(user.first_name, user.last_name)}
                                            url={!user?.avatar ? null : ImageHelper.getUrlImage(user?.avatar)}
                                            size={80}
                                            isLoading={isLoadingAvatar}
                                        />
                                        <div
                                            onClick={() => inputAvatarRef.current && inputAvatarRef.current.click()}
                                            className="avatar-overlay d-none justify-center items-center bg-gray-100 cursor-pointer opacity-50 w-80 h-80 position-absolute"
                                        >
                                            <EditIcon size={13} className="mr-4" />
                                            <span className="fw-700 fs-16 text-white">Edit</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col className="d-flex flex-direction-column justify-center">
                                    <div className="ml-8">
                                        <MButton
                                            className="text-blue-100 bg-white"
                                            type="text"
                                            onClick={() => inputAvatarRef.current && inputAvatarRef.current.click()}
                                        >
                                            {user?.avatar ? "Change photo" : "Upload photo"}
                                        </MButton>
                                        <input
                                            name="file"
                                            ref={inputAvatarRef}
                                            multiple={false}
                                            type="file"
                                            accept=".jpg,.jpeg,.png,.bmp,.webp"
                                            className="d-none"
                                            onChange={async (e) => {
                                                if (!e.target.files) return;
                                                await updateAvatarUser(e.target.files[0]);
                                                e.target.value = "";
                                            }}
                                        />
                                        <div className="fs-12 ml-10">Khuyến khích: 300px x 300px ・ Nhỏ hơn 10MB.</div>
                                    </div>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={24} md={12}>
                        <Form.Item
                            name="last_name"
                            label="Họ"
                            validateTrigger={["onChange"]}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input placeholder="Họ" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12}>
                        <Form.Item
                            name="first_name"
                            label="Tên"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input placeholder="Tên" />
                        </Form.Item>
                    </Col>
                </Row>

                <UserSettingButton isLoading={isLoading} onClose={() => onClose()} />
            </div>
        </Form>
    );
};

export default UserProfile;
