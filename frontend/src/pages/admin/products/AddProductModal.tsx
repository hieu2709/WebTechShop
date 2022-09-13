import { useRef, useState } from "react";
import { Button, Form, Image, Input, Modal, Select, Upload } from "antd";
import UrlHelper from "@/helpers/url.helper";
import { UploadOutlined } from "@ant-design/icons";
import FormHelper from "@/helpers/form.helper";
import { useAddProductMutation } from "@/pages/home/product.api";
import NotificationHelper from "@/helpers/notification.helper";
import ApiHelper from "@/helpers/api.helper";

const { Option } = Select;

type Props = {
    isShow: boolean;
    onClose: () => void;
};

const AddProductModal = ({ isShow, onClose }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [form] = Form.useForm();

    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    const [addProduct, { isLoading: isLoading }] = useAddProductMutation();

    const initialValues = {
        name: "",
        product_type_id: "",
        brand_id: "",
        image: "",
        price: "",
        description: "",
    };

    const validateMessages = {
        required: "Vui lòng nhập thông tin ${lable}",
    };

    return (
        <Modal title="Thêm sản phẩm mới" footer={null} onCancel={onClose} onOk={onClose} visible={isShow}>
            <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                initialValues={initialValues}
                onValuesChange={async () => {
                    const result = await FormHelper.validateFields(form, [
                        "name",
                        "product_type_id",
                        "brand_id",
                        "image",
                        "price",
                        "description",
                    ]);
                    setIsFormValid(result);
                }}
                validateMessages={validateMessages}
                onFinish={async (values) => {
                    try {
                        await addProduct(values).unwrap();
                        form.resetFields();
                        onClose();
                        location.reload();
                        NotificationHelper.showSuccess({ description: "Thêm sản phẩm mới thành công !" });
                    } catch (e) {
                        if (ApiHelper.isValidationError(e)) {
                            FormHelper.setFormErrors(e, form);
                        }
                        NotificationHelper.showError({
                            description: "Thao tác thất bại !",
                        });
                    }
                }}
            >
                <div className="d-flex flex-direction-column justify-center">
                    <div>
                        <Form.Item label="Loại sản phẩm" name="product_type_id">
                            <Select
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                <Option value="1">1-Laptop</Option>
                                <Option value="2">2-Desktop PC</Option>
                                <Option value="3">3-Networking Device</Option>
                                <Option value="4">4-Printer & Scanner</Option>
                                <Option value="5">5-PC Part</Option>
                                <Option value="6">6-Smartphone</Option>
                                <Option value="7">7-Camera</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Tên sản phẩm" name="name">
                            <Input placeholder="Nhap vao ten san pham" />
                        </Form.Item>

                        <Form.Item label="Hãng" name="brand_id">
                            <Select
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                <Option value="1">1-SamSung</Option>
                                <Option value="2">2-Xiaomi</Option>
                                <Option value="3">3-Tecno</Option>
                                <Option value="4">4-Asus</Option>
                                <Option value="5">5-Realme</Option>
                                <Option value="6">6-Apple</Option>
                                <Option value="7">7-Oppo</Option>
                                <Option value="8">8-Nokia</Option>
                                <Option value="9">9-BPhone</Option>
                                <Option value="10">10-Acer</Option>
                                <Option value="11">11-Lenovo</Option>
                                <Option value="12">12-Microsoft</Option>
                                <Option value="13">13-Fujtsu</Option>
                                <Option value="14">14-Hp</Option>
                                <Option value="15">15-Gopro</Option>
                                <Option value="16">16-Canon</Option>
                                <Option value="17">17-Brother</Option>
                                <Option value="18">18-Ezviz</Option>
                                <Option value="19">19-E-Power</Option>
                                <Option value="20">20-Viettel</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Anh" name="image">
                            <Upload ref={inputRef} maxCount={1} multiple={false}>
                                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item label="Giá tiền" name="price">
                            <Input placeholder="Nhập giá tiền" />
                        </Form.Item>
                        <Form.Item label="Mô tả" name="description">
                            <Input.TextArea placeholder="Nhập mô tả cho sản phẩm" className="h-200" size="large" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                className="w100p"
                                type="primary"
                                htmlType="submit"
                                loading={isLoading}
                                disabled={!isFormValid}
                            >
                                Xác nhận
                            </Button>
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </Modal>
    );
};

export default AddProductModal;
