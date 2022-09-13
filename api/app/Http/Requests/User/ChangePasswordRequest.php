<?php

namespace App\Http\Requests\User;

use App\Rules\SymbolRule;
use App\Rules\UppercaseLowercaseRule;
use Illuminate\Foundation\Http\FormRequest;

class ChangePasswordRequest extends FormRequest
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
            "current_password" => ["bail", "required", "current_password:api"],
            "new_password" => ["bail", "required", "min:8", new UppercaseLowercaseRule(), new SymbolRule()],
        ];
    }
}
