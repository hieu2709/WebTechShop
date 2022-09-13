import React, { MouseEventHandler } from "react";

export type SvgIconProps = {
    size?: number;
    className?: string;
    onClick?: MouseEventHandler<HTMLElement>;
};

const SvgIcon = ({ svg: SvgComponent, size = 24, className, onClick }: { svg: any } & SvgIconProps) => {
    const svgSize = size;
    return (
        <span role="img" className={`anticon svg-icon ${className || ""}`} onClick={onClick}>
            <SvgComponent width={`${svgSize}px`} height={`${svgSize}px`} />
        </span>
    );
};

export default SvgIcon;
