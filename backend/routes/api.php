<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

// Rutas para la gestión de clientes
Route::apiResource('customers', CustomerController::class);
// Rutas para la gestión de órdenes
Route::apiResource('orders', OrderController::class);