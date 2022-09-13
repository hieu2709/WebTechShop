import { Image } from "antd";
import MButton from "@/components/button/MButton";
import { useAddCartMutation } from "@/pages/client/cart/cart.api";
import { useNavigate } from "react-router-dom";
import RouteConfig from "@/configs/route.config";

type Props = {
    id: string;
    name: string;
    price: string;
    brand?: string;
    picture: string;
};

const ProductItem = ({ id, picture, name, price, brand }: Props) => {
    const [addToCart, { isLoading: isAddingCart }] = useAddCartMutation();
    const navigate = useNavigate();
    return (
        <div>
            <div
                style={{ minHeight: "400px" }}
                className="w-300 bg-white border-radius-sm border-solid pb-24 border-gray-20 d-flex flex-direction-column justify-space-between"
            >
                <div>
                    <Image className="w-200" preview={false} src={picture} />
                    <div className="p-12">
                        <div>{name}</div>
                    </div>
                </div>
                <div className="d-flex flex-direction-column justify-center pl-12 pr-12">
                    <div className="d-flex justify-space-between items-center">
                        <div className="text-gray fs-20 fw-400">{brand}</div>
                        <div className="text-black fs-16 fw-700">{price}₫</div>
                    </div>
                    <MButton
                        className="mt-12 mb-12"
                        type="primary"
                        onClick={async () => {
                            try {
                                console.log(id);
                                await addToCart({ product_id: id }).unwrap();
                            } catch (e) {
                                console.log(e);
                            }
                        }}
                    >
                        Thêm vào giỏ hàng
                    </MButton>
                    <MButton danger onClick={() => navigate(RouteConfig.PRODUCT_DETAIL.path.replace(":id", id))}>
                        Chi tiết
                    </MButton>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
