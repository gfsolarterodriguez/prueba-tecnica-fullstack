<?php

namespace App\Http\Controllers;

use App\Models\Orden;
use Illuminate\Http\Request;

class OrdenController extends Controller
{
    public function index() { 
        // Traemos las órdenes incluyendo la información del cliente vinculado
        return Order::with('customer')->get();
    }

    public function store(Request $request) {
        $order = Order::create($request->all());
        // Retornamos la orden recién creada ya con los datos de su cliente
        return Order::with('customer')->find($order->id);
    }

    public function update(Request $request, $id) {
        $orden = Orden::find($id);
        $orden->update($request->all());
        return Order::with('customer')->find($order->id);
    }

    public function destroy($id) {
        Order::destroy($id);
        return response()->json(['message' => 'Eliminado']);
    }

    
}
