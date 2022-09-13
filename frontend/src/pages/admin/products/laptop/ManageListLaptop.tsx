import { Button, Col, Table, Tag } from "antd";
import MInputSearch from "@/components/input/MInputSearch";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetLaptopQuery } from "@/pages/home/product.api";
import Loader from "@/components/loader/Loader";
import RouteConfig from "@/configs/route.config";
import AddProductModal from "@/pages/admin/products/AddProductModal";
import { useState } from "react";

const ManageListLaptop = () => {
    const [searchParams] = useSearchParams();

    const { data, isFetching } = useGetLaptopQuery(searchParams.toString());

    const [isShowAddModal, setIsShowAddModal] = useState<boolean>(false);

    const navigate = useNavigate();

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Trạng thái",
            dataIndex: "is_disabled",
            key: "is_disabled",
            render: (text: number) => {
                return text === 0 ? <Tag color="green">Enable</Tag> : <Tag color="red">Disable</Tag>;
            },
        },
        {
            title: "Action",
            key: "description",
            render: (record: any) => (
                <>
                    <Button
                        className="w-100"
                        type="primary"
                        shape="round"
                        onClick={() => {
                            // @ts-ignore
                            navigate(RouteConfig.DETAIL_PRODUCT_MANAGE.path.replace(":id", record.id));
                        }}
                    >
                        Chỉnh sửa
                    </Button>
                    {record.is_disabled ? (
                        <Button className="w-100 mt-12" type="primary" shape="round">
                            Enable
                        </Button>
                    ) : (
                        <Button className="w-100 mt-12" type="primary" shape="round" danger>
                            Disable
                        </Button>
                    )}
                </>
            ),
        },
    ];
    return (
        <div>
            <div className="d-flex justify-space-between items-center p-32">
                <MInputSearch className="w-500 " placeholder="Tìm kiếm laptop ..." />
                <Button onClick={() => setIsShowAddModal(true)}>Thêm mới sản phẩm </Button>
            </div>

            <div>
                {isFetching && <Loader />}
                {!isFetching && data && <Table columns={columns} dataSource={data.data.data} />}
            </div>
            <AddProductModal isShow={isShowAddModal} onClose={() => setIsShowAddModal(false)} />
        </div>
    );
};

export default ManageListLaptop;
