import PasswordPopover from "@/components/popover/PasswordPopover";
import { Form, Input } from "antd";
import MPopover from "@/components/popover/MPopover";
import { useState } from "react";
import { StoreValue } from "antd/lib/form/interface";

const regexBothUpperLowerChar = /(?=.*?[A-Z])(?=.*?[a-z])/;
const regexSymbol = /(?=.*?[^\w\s])/;

type Props = {
    name?: string;
    label?: string;
    placeholder?: string;
};

const PasswordInput = ({ name, label, placeholder }: Props) => {
    const [hasEnoughLength, setHasEnoughLength] = useState(false);
    const [hasBothUpperLowerChar, setHasBothUpperLowerChar] = useState(false);
    const [hasSymbol, setHasSymbol] = useState(false);

    const checkPasswordRegex = async (value: StoreValue = "") => {
        const hasEnoughLength = value.length >= 8;
        const hasBothUpperLowerChar = regexBothUpperLowerChar.test(value);
        const hasSymbol = regexSymbol.test(value);

        setHasEnoughLength(hasEnoughLength);
        setHasBothUpperLowerChar(hasBothUpperLowerChar);
        setHasSymbol(hasSymbol);

        if (!hasEnoughLength || !hasBothUpperLowerChar || !hasSymbol) {
            throw new Error("");
        }
    };

    return (
        <MPopover
            noArrow={true}
            overlayClassName="pt-0"
            placement="bottom"
            trigger="focus"
            content={
                <PasswordPopover
                    hasEnoughLength={hasEnoughLength}
                    hasBothUpperLowerChar={hasBothUpperLowerChar}
                    hasSymbol={hasSymbol}
                />
            }
        >
            <Form.Item
                className="password-item"
                name={name}
                label={label}
                rules={[
                    () => ({
                        validator: (rule, value) => checkPasswordRegex(value),
                    }),
                ]}
            >
                <Input.Password placeholder={placeholder} className="w100p" />
            </Form.Item>
        </MPopover>
    );
};

export default PasswordInput;
