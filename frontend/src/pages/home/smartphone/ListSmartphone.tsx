import { useSearchParams } from "react-router-dom";
import { useGetSmartphoneQuery } from "@/pages/home/product.api";
import { Row } from "antd";
import ProductItem from "@/components/products/ProductItem";
import Loader from "@/components/loader/Loader";
import UrlHelper from "@/helpers/url.helper";

const ListSmartphone = () => {
    const [searchParams] = useSearchParams();

    const { data, isFetching } = useGetSmartphoneQuery(searchParams.toString());
    const hasData = data && data.data && data.data.data.length > 0;
    return (
        <div>
            {hasData && !isFetching && (
                <Row justify="center" align="middle" className="pl-300 pr-300">
                    {data.data.data.map((child: any) => {
                        console.log(child);
                        return (
                            <ProductItem
                                id={child.id}
                                key={child.id}
                                brand={child.barnd_id}
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

export default ListSmartphone;
