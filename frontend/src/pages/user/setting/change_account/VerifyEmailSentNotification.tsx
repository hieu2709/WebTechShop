import { Button } from "antd";

type Props = {
    isResending: boolean;
    resend: () => void;
};

const VerifyEmailSentNotification = ({ isResending, resend }: Props) => {
    return (
        <div className="w-436">
            <div className="fs-14 text-white mb-8">
                <span className="fw-700">We have sent you an authentication email.</span>
                <br />
                Vui lòng nhấp vào liên kết có trong email xác minh mà bạn nhận được để xác thực.
            </div>
            <Button
                type="ghost"
                htmlType="submit"
                loading={isResending}
                className="fw-700 fs-14 text-white border-radius-md"
                onClick={() => resend()}
            >
                Gửi lại
            </Button>
        </div>
    );
};

export default VerifyEmailSentNotification;
