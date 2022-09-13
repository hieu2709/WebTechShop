import CheckCircleIcon from "@/components/icons/CheckCircleIcon";

type Props = {
    hasEnoughLength: boolean;
    hasBothUpperLowerChar: boolean;
    hasSymbol: boolean;
};

const PasswordPopover = ({ hasEnoughLength, hasBothUpperLowerChar, hasSymbol }: Props) => {
    return (
        <div className="w-240">
            <h2 className="fs-12 text-gray-70">Please include the following in your password</h2>
            <div className="d-flex items-center">
                <CheckCircleIcon
                    size={16}
                    className={`ease-all ml-8 mr-8 ${hasBothUpperLowerChar ? "text-blue-100" : "text-gray-20"}`}
                />
                Lowercase uppercase
            </div>

            <div className="d-flex items-center">
                <CheckCircleIcon
                    size={16}
                    className={`ease-all ml-8 mr-8 ${hasSymbol ? "text-blue-100" : "text-gray-20"}`}
                />
                Including symbols
            </div>

            <div className="d-flex items-center">
                <CheckCircleIcon
                    size={16}
                    className={`ease-all ml-8 mr-8 ${hasEnoughLength ? "text-blue-100" : "text-gray-20"}`}
                />
                8 characters or more
            </div>
        </div>
    );
};

export default PasswordPopover;
