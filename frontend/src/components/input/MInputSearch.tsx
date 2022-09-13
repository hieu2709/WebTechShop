import { useEffect, useState } from "react";
import { Input } from "antd";
import { SearchProps } from "antd/lib/input/Search";
import SearchIcon from "@/components/icons/SearchIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import "./index.scss";

type ValueType = string | number | readonly string[] | undefined;
type MInputSearchProps = Omit<SearchProps, "onChange"> & { onChange?: (value: ValueType) => void };

const MInputSearch = ({
    value,
    onChange,
    className,
    prefix,
    allowClear,
    suffix,
    onSearch,
    ...props
}: MInputSearchProps) => {
    const [localValue, setLocalValue] = useState<ValueType>();
    useEffect(() => {
        setLocalValue(value);
    }, [value]);
    className = (className || "") + " m-input-search";
    if (allowClear && !suffix) {
        suffix = (
            <CloseIcon
                className="text-gray-60 text-gray-80-hover cursor-pointer ease-all"
                onClick={() => {
                    setLocalValue("");
                    onChange && onChange("");
                    onSearch && onSearch("");
                }}
            />
        );
    }
    if (!prefix) prefix = <SearchIcon className="text-gray-70" />;
    return (
        <Input.Search
            value={localValue}
            onChange={(e) => {
                setLocalValue(e.target.value);
                onChange && onChange(e.target.value);
            }}
            onSearch={onSearch}
            className={className}
            suffix={suffix}
            prefix={prefix}
            {...props}
        />
    );
};
export default MInputSearch;
