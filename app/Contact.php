<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{

    public $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'address',
        'user_id',
    ];
    
    public function user() 
    {
        return $this->belongsTo(User::class);
    }
}
