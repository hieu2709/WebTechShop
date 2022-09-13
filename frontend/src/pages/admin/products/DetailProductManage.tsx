import { useParams } from "react-router-dom";
import { useDeleteProductMutation, useGetDetailProductQuery, useUpdateProductMutation } from "@/pages/home/product.api";
import Loader from "@/components/loader/Loader";
import { Button, Card, Col, Form, Image, Input, PageHeader, Row, Select, Table, Tag, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import UrlHelper from "@/helpers/url.helper";
import NotificationHelper from "@/helpers/notification.helper";
import ConfirmDeleteModal from "@/components/modal/ConfirmDeleteModal";
import RouteConfig from "@/configs/route.config";

const { Option } = Select;

const DetailProductManage = () => {
    const { id } = useParams();
    const { data, isFetching } = useGetDetailProductQuery({ id: id || "" });
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();
    const hasData = data && data.data && data.data.product;
    const [form] = Form.useForm();
    const navigate = useState();

    const inputRef = useRef<HTMLInputElement>(null);
    const [idDelete, setIdDelete] = useState("");
    const [isShowConfirmDeleteModal, setIsShowConfirmDeleteModal] = useState<boolean>(false);

    if (!data) return null;

    const initialValues = {
        id: data.data.product.id,
        name: data.data.product.name,
        product_type_id: data.data.product.product_type_id,
        brand_id: data.data.product.brand_id,
        picture: data.data.product.picture,
        price: data.data.product.price,
        description: data.data.product.description,
    };

    const validateMessages = {
        required: "Vui lòng nhập thông tin ${lable}",
    };

    const confirmDelete = async () => {
        try {
            await deleteProduct(idDelete).unwrap();
            location.reload();
            NotificationHelper.showSuccess({
                description: "Xóa sản phẩm thành công !",
            });
        } catch (e) {
            NotificationHelper.showError({
                description: "Thao tác thất bại !",
            });
        }
    };

    return (
        <>
            {isFetching && <Loader />}
            {!isFetching && hasData && (
                <div>
                    <PageHeader
                        title={`Product ID: ${data.data.product.id}`}
                        tags={
                            data.data.product.is_disabled ? (
                                <Tag className="d-flex justify-center items-center fs-20 fw-500" color="red">
                                    DISABLE
                                </Tag>
                            ) : (
                                <Tag className="d-flex justify-center items-center fs-20 fw-500" color="green">
                                    ENABLE
                                </Tag>
                            )
                        }
                    />
                    <Card>
                        <Form
                            form={form}
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 10 }}
                            layout="vertical"
                            requiredMark={false}
                            initialValues={initialValues}
                            validateMessages={validateMessages}
                            onFinish={async (values) => {
                                await updateProduct(values).unwrap();
                                NotificationHelper.showSuccess({
                                    description: "Cập nhật thành công",
                                });
                            }}
                        >
                            <div className="d-flex flex-direction-column justify-center">
                                <div>
                                    <Form.Item hidden={true} name="id">
                                        <Input />
                                    </Form.Item>

                                    <Form.Item label="Loại sản phẩm" name="product_type_id">
                                        <Input disabled={true} />
                                    </Form.Item>

                                    <Form.Item label="Tên sản phẩm" name="name">
                                        <Input placeholder="Nhap vao ten san pham" />
                                    </Form.Item>

                                    <Form.Item label="Hãng" name="brand_id">
                                        <Select
                                            showSearch
                                            placeholder="Select a person"
                                            optionFilterProp="children"
                                            // value={data.data.product.brand_id}
                                            onChange={(e) => {
                                                console.log(e);
                                            }}
                                            // onSearch={onSearch}
                                            filterOption={(input, option) =>
                                                (option!.children as unknown as string)
                                                    .toLowerCase()
                                                    .includes(input.toLowerCase())
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

                                    <Form.Item label="Ảnh">
                                        {data.data.product.picture && (
                                            <Image
                                                width={300}
                                                src={UrlHelper.getStaticUrl(data.data.product.picture)}
                                            />
                                        )}
                                    </Form.Item>

                                    <Form.Item>
                                        <Upload ref={inputRef} maxCount={1} multiple={false}>
                                            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                                        </Upload>
                                    </Form.Item>

                                    <Form.Item label="Giá tiền" name="price">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Mô tả" name="description">
                                        <Input.TextArea className="h-200" size="large" />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button className="w100p" type="primary" loading={isUpdating} htmlType="submit">
                                            Lưu lại thay đổi
                                        </Button>
                                    </Form.Item>

                                    <Form.Item>
                                        {data.data.product.is_disable ? (
                                            <Button className="w100p" type="primary">
                                                Enable
                                            </Button>
                                        ) : (
                                            <Button className="w100p" type="primary" danger>
                                                Disable
                                            </Button>
                                        )}
                                    </Form.Item>

                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            danger
                                            className="w100p"
                                            onClick={() => {
                                                setIdDelete(data.data.product.id);
                                                setIsShowConfirmDeleteModal(true);
                                            }}
                                        >
                                            Xóa
                                        </Button>
                                    </Form.Item>
                                </div>
                            </div>
                        </Form>
                    </Card>
                    <ConfirmDeleteModal
                        onCLose={() => setIsShowConfirmDeleteModal(false)}
                        isShow={isShowConfirmDeleteModal}
                        confirm={confirmDelete}
                    />
                </div>
            )}
        </>
    );
};

export default DetailProductManage;
