import MTable from "@/components/table/MTable";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import MButton from "@/components/button/MButton";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { useNavigate } from "react-router-dom";
import RouteConfig from "@/configs/route.config";
import { useEmptyCartMutation, useGetCartQuery } from "@/pages/client/cart/cart.api";
import NotificationHelper from "@/helpers/notification.helper";

const ShoppingCart = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const { data, isFetching } = useGetCartQuery();
    const [emptyCart, { isLoading }] = useEmptyCartMutation();
    const [useDeleteCartItemMutation, { isLoading: isDeleting }] = useEmptyCartMutation();

    const columns = [
        {
            title: "STT",
            key: "stt",
            dataIndex: "stt",
            width: "10%",
        },
        {
            title: "Name",
            key: "name",
            dataIndex: "name",
            width: "30%",
        },
        {
            title: "Price",
            key: "price",
            dataIndex: "price",
            width: "15%",
        },
        {
            title: "Quantity",
            key: "quantity",
            dataIndex: "quantity",
            width: "10%",
        },
        {
            title: "Subtotal",
            key: "subtotal",
            dataIndex: "subtotal",
            width: "20%",
        },
        {
            title: "Action",
            key: "action",
            width: "15%",
            render: (record: any) => {
                return (
                    <div>
                        <Button
                            type="primary"
                            danger
                            onClick={async () => {
                                await useDeleteCartItemMutation(record.stt).unwrap();
                                location.reload();
                            }}
                        >
                            Xoa san pham
                        </Button>
                    </div>
                );
            },
        },
    ];

    if (!data) return <>No data</>;

    const dataSource = [];



    let index = 1;

    for (const cartItem of data.data.cart) {
        let item = {};
        item.stt = index++;
        item.name = cartItem.product.name;
        item.price = cartItem.product.price;
        item.quantity = cartItem.count;
        item.subtotal = cartItem.count * cartItem.product.price;
        dataSource.push(item);
    }

    return (
        <>
            <Header />
            <div className="fs-32 fw-700 text-center">Shopping Cart</div>

            {data && data.data && (
                <Row style={{ minHeight: "100vh" }}>
                    <Col span={18}>
                        <div className="p-24">
                            <MTable columns={columns} dataSource={dataSource} />
                            <div className="d-flex justify-space-between p-24">
                                <MButton
                                    className="bg-white text-gray-40 fs-16 fw-500 border-radius-lg"
                                    onClick={() => navigate(RouteConfig.HOME.path)}
                                >
                                    Continue Shopping
                                </MButton>
                                <MButton
                                    className="bg-gray-100 text-white fs-16 fw-500 border-radius-lg"
                                    onClick={async () => {
                                        try {
                                            await emptyCart().unwrap();
                                            location.reload();
                                            NotificationHelper.showSuccess({
                                                description: "Xoa thanh cong",
                                            });
                                        } catch (e) {
                                            NotificationHelper.showError({
                                                description: "Thao tac that bai",
                                            });
                                        }
                                    }}
                                >
                                    Clear Shopping Cart
                                </MButton>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="p-24">
                            <Form
                                form={form}
                                layout="vertical"
                                autoComplete="off"
                                requiredMark={false}
                                validateTrigger={false}
                            >
                                <div>Summary</div>
                                <div>Estimate Shipping and Phone</div>

                                <Form.Item label="Country" name="country" className="mb-16">
                                    <Input placeholder="e.g Viet Nam" />
                                </Form.Item>

                                <Form.Item label="City" name="city" className="mb-16">
                                    <Input placeholder="e.g Nam Dinh" />
                                </Form.Item>

                                <Form.Item label="District" name="district" className="mb-16">
                                    <Input placeholder="e.g Nam Truc" />
                                </Form.Item>

                                <Divider />
                                <div>
                                    <div className="d-flex justify-space-between items-center">
                                        <div>Subtotal</div>
                                        <div>$13,047</div>
                                    </div>

                                    <div className="d-flex justify-space-between items-center">
                                        <div>Shipping</div>
                                        <div>$13</div>
                                    </div>

                                    <div className="d-flex justify-space-between items-center">
                                        <div>Tax</div>
                                        <div>$1</div>
                                    </div>

                                    <div className="d-flex justify-space-between items-center">
                                        <div>Order Total</div>
                                        <div>$13,047</div>
                                    </div>
                                </div>

                                <Divider />

                                <MButton className="w100p border-radius-lg" type="primary" htmlType="submit">
                                    Proceed to Checkout
                                </MButton>
                            </Form>
                        </div>
                    </Col>
                </Row>
            )}

            <Footer />
        </>
    );
};

export default ShoppingCart;
