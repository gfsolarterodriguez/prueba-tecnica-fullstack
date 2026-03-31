<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    protected $fillable = ['fullName', 'email', 'phone', 'isActive'];

    // Relación: Una Order pertenece a un Customer
    public function orders() {
        return $this->hasMany(Order::class); 
    }
}
