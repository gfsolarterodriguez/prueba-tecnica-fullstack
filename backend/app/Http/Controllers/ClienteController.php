<?php

namespace App\Http\Controllers;
use App\Models\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    public function index() { return Cliente::all(); }

    public function store(Request $request) {
        return Cliente::create($request->all());
    }

    public function destroy($id) {
        Cliente::destroy($id);
        return response()->json(['message' => 'Eliminado']);
    }

    // Función para Actualizar
    public function update(Request $request, $id) {
        $cliente = Cliente::find($id);
        $cliente->update($request->all());
        return $cliente;
    }
}
