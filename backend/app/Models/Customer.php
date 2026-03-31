<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $fillable = ['customer_id', 'orderNumber', 'status', 'totalAmount', 'notes'];

    // Relación: Una Order pertenece a un Customer
    public function customer() {
        return $this->belongsTo(Customer::class);
    }
}
