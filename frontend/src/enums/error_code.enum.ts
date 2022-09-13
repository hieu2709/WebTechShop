export type ErrorCodeType =
    | "UNPROCESSABLE_ENTITY"
    | "NO_ACCESS_TOKEN"
    | "INVALID_ACCESS_TOKEN"
    | "AUTH_RESET_PASSWORD_REQUEST_THROTTLED"
    | "AUTH_RESET_PASSWORD_INVALID_TOKEN";

const ErrorCodeEnum: { [key in ErrorCodeType]: { value: string; text: string } } = Object.freeze({
    NO_ACCESS_TOKEN: { value: "E_NO_ACCESS_TOKEN", text: "" },
    INVALID_ACCESS_TOKEN: { value: "E_INVALID_ACCESS_TOKEN", text: "" },
    UNPROCESSABLE_ENTITY: { value: "E_UNPROCESSABLE_ENTITY", text: "" },

    AUTH_RESET_PASSWORD_REQUEST_THROTTLED: { value: "AUTH_RESET_PASSWORD_REQUEST_THROTTLED", text: "" },
    AUTH_RESET_PASSWORD_INVALID_TOKEN: { value: "AUTH_RESET_PASSWORD_INVALID_TOKEN", text: "" },
});

export default ErrorCodeEnum;
