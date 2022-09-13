<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class RoleEnum extends Enum
{
    const ADMIN_ROLE = "admin";
    const USER_ROLE = "user";

    public function __toString(): string
    {
        return (string) $this->value;
    }
}
