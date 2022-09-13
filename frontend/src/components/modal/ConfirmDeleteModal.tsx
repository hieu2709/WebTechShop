import MModal from "@/components/modal/MModal";
import { Button, Modal } from "antd";

type Props = {
    onCLose: () => void;
    isShow: boolean;
    confirm: () => void;
};

const ConfirmDeleteModal = ({ onCLose, confirm, isShow }: Props) => {
    return (
        <Modal footer={null} onCancel={onCLose} onOk={onCLose} visible={isShow}>
            <div>Xác nhận xóa sản phẩm này ?</div>
            <div className="d-flex justify-space-evenly">
                <Button type={"primary"} shape={"round"} size={"small"} onClick={confirm}>
                    Xác nhận
                </Button>
                <Button type="primary" danger shape={"round"} size={"small"} onClick={onCLose}>
                    Hủy
                </Button>
            </div>
        </Modal>
    );
};

export default ConfirmDeleteModal;
