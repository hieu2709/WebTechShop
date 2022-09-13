import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ButtonProps } from "antd/lib/button/button";
import { Button } from "antd";
import "./index.scss";

type Props = { link?: string } & ButtonProps & React.RefAttributes<HTMLElement>;

const MButton = ({ className, link, onClick, ...props }: Props) => {
    const navigate = useNavigate();
    const defaultClass = "m-btn justify-center";
    if (!className) className = defaultClass;
    else className += " " + defaultClass;
    if (!onClick && link) {
        onClick = () => navigate(link);
    }
    switch (props.type) {
        case "default":
            className += " border-gray-70-hover bg-gray-20-hover opacity-70-hover ";
            className += props.disabled ? "text-gray-60" : "text-gray-70";
            break;
        case "primary":
            className += " text-white";
            if (props.disabled) {
                className += " border-gray-40 bg-gray-60 bg-gray-60-hover";
                break;
            }
            className += " bg-blue-100-hover opacity-70-hover";
            break;
    }
    return <Button className={className} onClick={onClick} {...props} />;
};

export default MButton;
