<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    protected $table = "department";
    protected $fillable = ['department', 'positioDpt', 'gender_id'];

    //relations

    public function Gender()
    {
        return $this->belongsTo(Gender::class, 'gender_id');
    }
}
