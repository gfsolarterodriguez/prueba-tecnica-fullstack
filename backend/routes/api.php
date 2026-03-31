<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\OrdenController;
use Illuminate\Support\Facades\Route;

// Rutas para la gestión de clientes
Route::apiResource('customers', CustomerController::class);
// Rutas para la gestión de órdenes
Route::apiResource('orders', OrderController::class);