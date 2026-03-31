<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\OrdenController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Rutas para la gestión de clientes
Route::apiResource('clientes', ClienteController::class);
// Rutas para la gestión de órdenes
Route::apiResource('ordenes', OrdenController::class);