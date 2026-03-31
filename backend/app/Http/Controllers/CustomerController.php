<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index() { return Customer::all(); }

    public function store(Request $request) {
        $customer = Customer::create($request->all());
        return $customer;
    }

    public function update(Request $request, $id) {
        $customer = Customer::find($id);
        $customer->update($request->all());
        return $customer;
    }

    public function destroy($id) {
        Customer::destroy($id);
        return response()->json(['message' => 'Eliminado']);
    }

    // Función para Actualizar
    
}
