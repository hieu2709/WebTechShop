import FailedResult from "@/components/results/FailedResult";

const VerifyNewEmailFailed = () => {
    return (
        <>
            <FailedResult message="Xin lỗi, chúng tôi không thể xác minh địa chỉ email mới của bạn. Vui lòng thử lại" />
        </>
    );
};

export default VerifyNewEmailFailed;
