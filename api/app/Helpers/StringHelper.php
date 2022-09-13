<?php

namespace App\Helpers;

class StringHelper
{
    public static function escape(string $str): string
    {
        return str_replace(["\\", "%", "_", "*"], ["\\\\", "\%", "\_", "\*"], $str);
    }
}
