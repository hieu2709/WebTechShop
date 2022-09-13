<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class ImageUploadHelper
{
    public static function handleImageUpload($image, $path, $deletePath = null)
    {
        $store  = Storage::putFile($path, $image);
        $path = Storage::url($store);
        if ($deletePath) {
            try {
                unlink(public_path($deletePath));
            } catch (\Exception $e) {
            }
        }
        return $path;
    }
}
