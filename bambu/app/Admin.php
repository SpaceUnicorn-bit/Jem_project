<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
	protected $table = "admins";
    protected $fillable = [
        'name',
        'priority',
        'password'
    ];

    public function aparts()
    {
    	return $this->hasMany('app/apart');
    }
}
