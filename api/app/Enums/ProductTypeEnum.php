<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class ProductTypeEnum extends Enum
{
    const LAPTOP =   "laptop";
    const DESKTOP_PC =   "desktop";
    const NETWORKING_DEVICE = "networking";
    const PRINTER = "printer";
    const PC_PART = "part";
    const SMARTPHONE = "smartphone";
    const CAMERA = "camera";

    public function __toString(): string
    {
        return (string) $this->value;
    }
}
