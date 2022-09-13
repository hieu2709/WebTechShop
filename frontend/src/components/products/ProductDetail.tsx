import { useNavigate, useParams } from "react-router-dom";
import { useGetDetailProductQuery } from "@/pages/home/product.api";
import { Col, Image, Row } from "antd";
import BackIcon from "@/components/icons/BackIcon";
import RouteConfig from "@/configs/route.config";
import MButton from "@/components/button/MButton";
import { useAddCartMutation } from "@/pages/client/cart/cart.api";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import UrlHelper from "@/helpers/url.helper";

const ProductDetail = () => {
    const { id } = useParams();
    const { data, isFetching } = useGetDetailProductQuery({ id: id || "" });
    const navigate = useNavigate();

    const [addToCart, { isLoading: isAddingCart }] = useAddCartMutation();

    return (
        <div>
            <Header />
            {data && (
                <div>
                    <div className="pl-300 pr-300 pl-24" style={{ minHeight: "100vh" }}>
                        <Row>
                            <Col span={12}>
                                <div className="p-48">
                                    <Image
                                        className="w-300"
                                        preview={false}
                                        src={UrlHelper.getStaticUrl(data.data.product.picture)}
                                    />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="w-480 p-48">
                                    <div className="fs-18 fw-700">{data.data.product.name}</div>
                                    <div className="fs-24 fw-700">{data.data.product.price} đ</div>
                                    <div className="fs-16 fw-400">{data.data.product.description}</div>
                                </div>
                                <div className="d-flex pl-48">
                                    <MButton
                                        type="primary"
                                        onClick={async () => {
                                            try {
                                                await addToCart(data.data.product.id).unwrap();
                                            } catch (e) {
                                                console.log(e);
                                            }
                                        }}
                                    >
                                        Thêm vào giỏ hàng
                                    </MButton>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <div className="d-flex justify-center istems-center">
                                <BackIcon className="mr-12" onClick={() => navigate(RouteConfig.HOME.path)} />
                                <div className="fs-16 fw-500">Quay lại trang sản phẩm</div>
                            </div>
                        </Row>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default ProductDetail;
