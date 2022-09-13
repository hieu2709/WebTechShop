import CartSvg from "@/assets/icons/cart.svg?component";
import SvgIcon, { SvgIconProps } from "@/components/SvgIcon";

const CartIcon = (props: SvgIconProps) => <SvgIcon svg={CartSvg} {...props} />;

export default CartIcon;
