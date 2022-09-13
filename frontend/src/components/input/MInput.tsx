import { useEffect, useState } from "react";
import { Input } from "antd";
import { InputProps } from "antd/lib/input/Input";
import CloseIcon from "@/components/icons/CloseIcon";
import "./index.scss";

type ValueType = string | number | readonly string[] | undefined;
type MInputProps = Omit<InputProps, "onChange"> & { onChange?: (value: ValueType) => void };

const MInput = ({ value, onChange, className, allowClear, suffix, ...props }: MInputProps) => {
    const [localValue, setLocalValue] = useState<ValueType>();
    useEffect(() => {
        setLocalValue(value);
    }, [value]);
    className = (className || "") + " m-input";
    if (allowClear && !suffix) {
        suffix = (
            <CloseIcon
                className="text-gray-60 text-gray-80-hover cursor-pointer ease-all"
                onClick={() => {
                    setLocalValue("");
                    onChange && onChange("");
                }}
            />
        );
    }
    return (
        <Input
            value={localValue}
            onChange={(e) => {
                setLocalValue(e.target.value);
                onChange && onChange(e.target.value);
            }}
            className={className}
            suffix={suffix}
            {...props}
        />
    );
};
export default MInput;
