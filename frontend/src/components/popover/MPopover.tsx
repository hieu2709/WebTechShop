import { Popover } from "antd";
import { PopoverProps } from "antd/lib/popover";
import "./index.scss";

const MPopover = ({ className, overlayClassName, noArrow = false, ...props }: PopoverProps & { noArrow?: boolean }) => {
    className = (className || "") + " m-popover";
    overlayClassName = (overlayClassName || "") + " m-popover-overlay";
    if (noArrow) {
        overlayClassName += " no-arrow";
    }
    return <Popover className={className} overlayClassName={overlayClassName} {...props} />;
};

export default MPopover;
