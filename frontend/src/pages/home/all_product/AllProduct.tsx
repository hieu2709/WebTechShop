import { useSearchParams } from "react-router-dom";
import { useGetAllQuery, useGetCameraQuery } from "@/pages/home/product.api";
import ProductItem from "@/components/products/ProductItem";
import UrlHelper from "@/helpers/url.helper";
import { Image } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

type Props = {
    setActiveTab: (index: string) => void;
};

const AllProduct = ({ setActiveTab }: Props) => {
    const [searchParams] = useSearchParams();

    const { data, isFetching } = useGetAllQuery(searchParams.toString());

    if (!data) return null;
    const laptopShow = data.data[0];
    const desktopShow = data.data[1];
    const networkingDeviceShow = data.data[2];
    const printerShow = data.data[3];
    const partShow = data.data[4];
    const smartphoneShow = data.data[5];
    const cameraShow = data.data[6];

    return (
        <>
            <div>
                {laptopShow.map((child: any) => {
                    return (
                        <div>
                            <div className="d-flex justify-center items-center">
                                {child.map((e: any) => (
                                    <ProductItem
                                        id={e.id}
                                        name={e.name}
                                        price={e.price}
                                        picture={UrlHelper.getStaticUrl(e.picture)}
                                    />
                                ))}
                            </div>
                            <div
                                onClick={() => setActiveTab("1")}
                                className="fs-16 fw-500 text-blue-100 cursor-pointer"
                                style={{ textAlign: "end" }}
                            >
                                Xem thêm sản phẩm <ArrowRightOutlined />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div>
                {desktopShow.map((child: any) => {
                    return (
                        <div>
                            <div className="d-flex justify-center items-center">
                                {child.map((e: any) => (
                                    <ProductItem
                                        id={e.id}
                                        name={e.name}
                                        price={e.price}
                                        picture={UrlHelper.getStaticUrl(e.picture)}
                                    />
                                ))}
                            </div>
                            <div
                                onClick={() => setActiveTab("2")}
                                className="fs-16 fw-500 text-blue-100 cursor-pointer"
                                style={{ textAlign: "end" }}
                            >
                                Xem thêm sản phẩm <ArrowRightOutlined />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div>
                {networkingDeviceShow.map((child: any) => {
                    return (
                        <div>
                            <div className="d-flex justify-center items-center">
                                {child.map((e: any) => (
                                    <ProductItem
                                        id={e.id}
                                        name={e.name}
                                        price={e.price}
                                        picture={UrlHelper.getStaticUrl(e.picture)}
                                    />
                                ))}
                            </div>
                            <div
                                onClick={() => setActiveTab("3")}
                                className="fs-16 fw-500 text-blue-100 cursor-pointer"
                                style={{ textAlign: "end" }}
                            >
                                Xem thêm sản phẩm <ArrowRightOutlined />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div>
                {printerShow.map((child: any) => {
                    return (
                        <div>
                            <div className="d-flex justify-center items-center">
                                {child.map((e: any) => (
                                    <ProductItem
                                        id={e.id}
                                        name={e.name}
                                        price={e.price}
                                        picture={UrlHelper.getStaticUrl(e.picture)}
                                    />
                                ))}
                            </div>
                            <div
                                onClick={() => setActiveTab("4")}
                                className="fs-16 fw-500 text-blue-100 cursor-pointer"
                                style={{ textAlign: "end" }}
                            >
                                Xem thêm sản phẩm <ArrowRightOutlined />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div>
                {partShow.map((child: any) => {
                    return (
                        <div>
                            <div className="d-flex justify-center items-center">
                                {child.map((e: any) => (
                                    <ProductItem
                                        id={e.id}
                                        name={e.name}
                                        price={e.price}
                                        picture={UrlHelper.getStaticUrl(e.picture)}
                                    />
                                ))}
                            </div>
                            <div
                                onClick={() => setActiveTab("5")}
                                className="fs-16 fw-500 text-blue-100 cursor-pointer"
                                style={{ textAlign: "end" }}
                            >
                                Xem thêm sản phẩm <ArrowRightOutlined />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div>
                {smartphoneShow.map((child: any) => {
                    return (
                        <div>
                            <div className="d-flex justify-center items-center">
                                {child.map((e: any) => (
                                    <ProductItem
                                        id={e.id}
                                        name={e.name}
                                        price={e.price}
                                        picture={UrlHelper.getStaticUrl(e.picture)}
                                    />
                                ))}
                            </div>
                            <div
                                onClick={() => setActiveTab("6")}
                                className="fs-16 fw-500 text-blue-100 cursor-pointer"
                                style={{ textAlign: "end" }}
                            >
                                Xem thêm sản phẩm <ArrowRightOutlined />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div>
                {cameraShow.map((child: any) => {
                    return (
                        <div>
                            <div className="d-flex justify-center items-center">
                                {child.map((e: any) => (
                                    <ProductItem
                                        id={e.id}
                                        name={e.name}
                                        price={e.price}
                                        picture={UrlHelper.getStaticUrl(e.picture)}
                                    />
                                ))}
                            </div>
                            <div
                                className="fs-16 fw-500 text-blue-100 cursor-pointer"
                                style={{ textAlign: "end" }}
                                onClick={() => setActiveTab("7")}
                            >
                                Xem thêm sản phẩm <ArrowRightOutlined />
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default AllProduct;
