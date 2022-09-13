import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { Tabs } from "antd";
import ListLaptop from "@/pages/home/laptops/ListLaptop";
import ListDesktop from "@/pages/home/desktop_pc/ListDesktop";
import ListNetworkingDevice from "@/pages/home/networking_decive/ListNetworkingDevice";
import ListPrinterScanner from "@/pages/home/printer_scanner/ListPrinterScanner";
import ListPCPart from "@/pages/home/pc_part/ListPCPart";
import ListSmartphone from "@/pages/home/smartphone/ListSmartphone";
import ListCamera from "@/pages/home/camera/ListCamera";
import AllProduct from "@/pages/home/all_product/AllProduct";
import { useState } from "react";

const { TabPane } = Tabs;

const Home = () => {
    const [activeKey, setActiveKey] = useState<string>("0");

    const handleOnChangeTab = (activeKey: string) => {
        setActiveKey(activeKey);
    };

    return (
        <div className="home-page">
            <Header />
            <div className="d-flex justify-center items-center">
                <Tabs
                    activeKey={activeKey}
                    onChange={(e) => handleOnChangeTab(e)}
                    style={{ minHeight: "100vh" }}
                    className="m-tabs d-flex justify-center items-center"
                    defaultActiveKey="0"
                >
                    <TabPane tab="All products" key="0">
                        <AllProduct setActiveTab={setActiveKey} />
                    </TabPane>
                    <TabPane tab="Laptops" key="1">
                        <ListLaptop />
                    </TabPane>
                    <TabPane tab="Desktop PCs" key="2">
                        <ListDesktop />
                    </TabPane>
                    <TabPane tab="Networking Devices" key="3">
                        <ListNetworkingDevice />
                    </TabPane>
                    <TabPane tab="Printers & Scanners" key="4">
                        <ListPrinterScanner />
                    </TabPane>
                    <TabPane tab="PC Parts" key="5">
                        <ListPCPart />
                    </TabPane>
                    <TabPane tab="Smartphones" key="6">
                        <ListSmartphone />
                    </TabPane>
                    <TabPane tab="Cameras" key="7">
                        <ListCamera />
                    </TabPane>
                    <TabPane tab="About" key="8">
                        e
                    </TabPane>
                </Tabs>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
