import LogoSvg from "@/assets/images/logo.svg?component";
import SvgIcon, { SvgIconProps } from "@/components/SvgIcon";

const LogoIcon = (props: SvgIconProps) => <SvgIcon svg={LogoSvg} {...props} />;

export default LogoIcon;
