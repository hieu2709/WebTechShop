<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccessToken extends Model
{
    use HasFactory;

    protected $fillable = ["user_id", "token", "expired_at"];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
