import React from "react";
import { Modal } from "antd";
import { ModalProps } from "antd/lib/modal/Modal";
import CloseIcon from "@/components/icons/CloseIcon";
import "./index.scss";

const MModal = ({ className, closeIcon, children, ...props }: { children: React.ReactNode } & ModalProps) => {
    if (!closeIcon) closeIcon = <CloseIcon size={32} className="color-gray-70" />;
    className = (className || "") + " m-modal";
    return (
        <Modal className={className} closeIcon={closeIcon} {...props}>
            {children}
        </Modal>
    );
};

export default MModal;
