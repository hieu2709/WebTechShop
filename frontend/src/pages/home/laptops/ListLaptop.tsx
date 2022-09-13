import ProductItem from "@/components/products/ProductItem";
import { Col, Row } from "antd";
import { useGetLaptopQuery } from "@/pages/home/product.api";
import { useSearchParams } from "react-router-dom";
import Loader from "@/components/loader/Loader";
import UrlHelper from "@/helpers/url.helper";

const ListLaptop = () => {
    const [searchParams] = useSearchParams();

    const { data, isFetching } = useGetLaptopQuery(searchParams.toString());
    const hasData = data && data.data && data.data.data.length > 0;

    return (
        <div>
            {hasData && !isFetching && (
                <Row justify="center" align="middle" className="pl-300 pr-300">
                    {data.data.data.map((child: any) => {
                        return (
                            <ProductItem
                                id={child.id}
                                key={child.id}
                                brand={child.barnd}
                                picture={UrlHelper.getStaticUrl(child.picture)}
                                name={child.name}
                                price={child.price}
                            />
                        );
                    })}
                </Row>
            )}
            {isFetching && <Loader />}
        </div>
    );
};

export default ListLaptop;
