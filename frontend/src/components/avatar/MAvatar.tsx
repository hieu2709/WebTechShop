import { Avatar, Spin } from "antd";
import { AvatarProps } from "antd/lib/skeleton/Avatar";
import * as React from "react";

type Props = { text: string; url: string | null; isLoading?: boolean } & AvatarProps;

const MAvatar = ({ size, text, url, isLoading = false }: Props) => {
    return (
        <Avatar
            src={!isLoading && url}
            size={size}
            className={`fs-32 fw-700 border-1 border-solid border-gray-40 ${!isLoading && "bg-gray-70 "}`}
        >
            {isLoading ? <Spin /> : text}
        </Avatar>
    );
};

export default MAvatar;
