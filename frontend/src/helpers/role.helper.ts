import RoleEnum from "@/enums/role.enum";
import { User } from "@/types/models/user";

export const hasRole = (user: any, roleName: string) => {
    if (!user.roles) return false;
    for (const role of user.roles) {
        if (role.name === roleName) return true;
    }
    return false;
};

export const allowedClientPage = (user: User) => {
    if (hasRole(user, RoleEnum.USER.value)) {
        return true;
    }
    return false;
};

export const allowedAdminPage = (user: User) => {
    if (hasRole(user, RoleEnum.ADMIN.value)) {
        return true;
    }
    return false;
};
