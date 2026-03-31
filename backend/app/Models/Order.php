<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    protected $fillable = [
        'customer_id', 
        'orderNumber', 
        'status', 
        'totalAmount', 
        'notes'
    ];

    /**
     * Relación: Una Orden pertenece a un Cliente (N:1)
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}