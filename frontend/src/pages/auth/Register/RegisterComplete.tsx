import RouteConfig from "@/configs/route.config";
import { Link } from "react-router-dom";

const RegisterComplete = () => {
    return (
        <>
            <div className="d-flex flex-direction-column items-center mt-32 bg-gray-10">
                <div className="w-500 fw-700 p-32 bg-white border-1 border-solid border-gray-20 border-radius-md">
                    <div className="fs-20 text-gray-100">I sent you an email for authentication</div>
                    <p className="fs-14 fw-400 text-gray-70 mt-16">
                        We have sent an authentication email to the email address you entered. After confirming the
                        contents, confirm the authentication from the authentication URL
                    </p>
                </div>
                <div className="mt-8 fs-14 fw-500 text-center text-gray-100">
                    Do you already have an account?
                    <Link to={RouteConfig.LOGIN.path} className="p-0">
                        Login
                    </Link>
                </div>
            </div>
        </>
    );
};

export default RegisterComplete;
