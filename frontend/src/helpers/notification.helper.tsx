import { notification } from "antd";
import React from "react";
import { ArgsProps, NotificationInstance } from "antd/lib/notification";
import CloseIcon from "@/components/icons/CloseIcon";

type NotificationMode = "full" | "compact";

type NotificationProps = { type: keyof NotificationInstance; mode?: NotificationMode } & ArgsProps;

const NotificationHelper = {
    showNotification: ({ type, mode = "compact", className, closeIcon, ...props }: NotificationProps) => {
        className = (className || "") + (mode === "compact" ? "m-notification-simple" : "m-notification");
        if (!closeIcon) closeIcon = <CloseIcon size={16} />;
        notification[type]({ className, closeIcon, ...props });
    },
    showSuccess: ({ duration = 5, description, ...props }: Omit<ArgsProps, "message">) => {
        NotificationHelper.showNotification({
            type: "success",
            message: "",
            duration,
            description: processDescription(description),
            ...props,
        });
    },
    showError: ({ duration = 10, description, ...props }: Omit<ArgsProps, "message">) => {
        NotificationHelper.showNotification({
            type: "error",
            message: "",
            duration,
            description: processDescription(description),
            ...props,
        });
    },
    showInfo: ({ duration = 60, description, ...props }: Omit<ArgsProps, "message">) => {
        NotificationHelper.showNotification({
            type: "info",
            message: "",
            duration,
            description: processDescription(description),
            ...props,
        });
    },
};

const processDescription = (msg: React.ReactNode) => {
    if (typeof msg !== "string") return msg;
    let newMsg = msg;
    if (newMsg.length > 100) {
        newMsg = newMsg.substring(0, 100) + "...";
    }
    return newMsg;
};

export default NotificationHelper;
