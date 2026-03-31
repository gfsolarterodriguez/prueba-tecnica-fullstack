<?php

namespace App\Http\Controllers;
use App\Models\Orden;
use Illuminate\Http\Request;

class OrdenController extends Controller
{
    public function index() { return Orden::all(); }

    public function store(Request $request) {
        return Orden::create($request->all());
    }

    public function destroy($id) {
        Orden::destroy($id);
        return response()->json(['message' => 'Eliminado']);
    }

    public function update(Request $request, $id) {
        $orden = Orden::find($id);
        $orden->update($request->all());
        return $orden;
    }
}
