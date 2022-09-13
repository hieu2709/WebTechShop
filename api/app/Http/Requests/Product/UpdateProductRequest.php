<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "name" => ["required", "string", "min:1"],
            "price" => ["required", "integer", "min:1"],
            "description" => ["nullable", "string", "min:1"],
            "brand_id" => ["required", "integer", "exists:brands,id"],
            "product_type_id" => ["required", "integer", "exists:product_types,id"],
            "image" => ["nullable", "image", "mimes:jpg,jpeg,png,bmp,webp", "max:8192"],
        ];
    }
}
