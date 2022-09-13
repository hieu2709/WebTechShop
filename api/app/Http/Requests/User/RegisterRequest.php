<?php

namespace App\Http\Requests\User;

use App\Rules\SymbolRule;
use App\Rules\UppercaseLowercaseRule;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            "first_name" => ["bail", "required", "max:255"],
            "last_name" => ["bail", "required", "max:255"],
            "email" => ["bail", "required", "max:255", "email", "unique:users"],
            "password" => ["bail", "required", "min:8", new UppercaseLowercaseRule(), new SymbolRule()],
        ];
    }
}
