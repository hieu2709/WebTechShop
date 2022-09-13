import { Col, Row } from "antd";
import MapIcon from "@/components/icons/MapIcon";
import PhoneIcon from "@/components/icons/PhoneIcon";
import MailIcon from "@/components/icons/MailIcon";
import SkypeIcon from "@/components/icons/SkypeIcon";
import LogoIcon from "@/components/icons/LogoIcon";

const Footer = () => {
    return (
        <div>
            <div className="bg-footer-100 pt-60 pb-60 pl-40 pr-40 text-footer-10">
                <div className="d-flex justify-center items-center">
                    <Row>
                        <div className="w-300 lh-29 p-16">
                            <LogoIcon size={200} className="text-white" />
                            <p className="mt-18 fs-12 text-footer-10">
                                We are a young company always looking for new and creative ideas to help you with our
                                products in your everyday work.
                            </p>
                            <p>We are TechShop</p>
                        </div>
                        <div className="w-400 p-16 pl-64">
                            <Row align="middle" justify="center" className="mt-16">
                                Contact
                            </Row>
                            <div className="mt-16">
                                <MapIcon className="mr-8" /> 55 Giai Phong
                            </div>
                            <div className="mt-16">
                                <PhoneIcon className="mr-8" /> 0984422555
                            </div>
                            <div className="mt-16">
                                <MailIcon className="mr-8" /> longln18nd@gmail.com
                            </div>
                            <div className="mt-16">
                                <SkypeIcon className="mr-8" /> longln25
                            </div>
                        </div>
                        <div className="w-300 p-16">
                            <Row align="middle" justify="center">
                                Links
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <div className="mt-24">Home</div>
                                    <div className="mt-24">Feature</div>
                                    <div className="mt-24">Home it works</div>
                                    <div className="mt-24">Our clients</div>
                                </Col>
                                <Col span={12}>
                                    <div className="mt-24">Plans & pricing</div>
                                    <div className="mt-24">Affiliates</div>
                                    <div className="mt-24">Terms</div>
                                </Col>
                            </Row>
                        </div>
                    </Row>
                </div>
            </div>
        </div>
    );
};
export default Footer;
