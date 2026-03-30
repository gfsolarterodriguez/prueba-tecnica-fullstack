import { useState } from "react";
export function Ordenes() {
  // 1. Datos simulados (Mock Data).
  const [ordenes, setOrdenes] = useState([
    { id: 1, cliente: "Gian Solarte", producto: "Laptop", total: 1500, estado: "Pendiente",},
    { id: 2, cliente: "Ana Gómez", producto: "Tablet", total: 1700, estado: "Denegada",},
    { id: 3, cliente: "Juan Pérez", producto: "PC Gamer", total: 2500, estado: "Aprobada",},
    { id: 4, cliente: "Carlos Ruiz",  producto: "Laptop", total: 1650, estado: "Pendiente",},
  ]);
  // 1.1. Estado para el formulario
  const [formulario, setFormulario] = useState({
    cliente: "",
    producto: "",
    total: "",
    estado: "",
  });

  // 1.1.1. Estado para mostrar/ocultar el formulario
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // 2. Función para eliminar
  const eliminarOrden = (idParaBorrar) => {
    // filter() crea un arreglo nuevo con todos las ordenes EXCEPTO el que coincida con el id
    const nuevaLista = ordenes.filter((orden) => orden.id !== idParaBorrar);
    // setClientes avisa a React y redibuja la tabla
    setOrdenes(nuevaLista);
  };

  // 3. Captura lo que escribes en los inputs
  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  // 3.1. Guarda el nuevo cliente en la tabla
  const guardarOrden = (e) => {
    e.preventDefault(); // Evita que la página recargue al enviar el form

    // 3.1.1. Validar que no haya campos vacíos
    if ( !formulario.cliente || !formulario.producto || !formulario.total || !formulario.estado){
      alert("Por favor llena todos los campos de la solicitud");
      return;
    }

    // 3.2. Crear un ID temporal
    const nuevoId =
      ordenes.length > 0 ? Math.max(...ordenes.map((c) => c.id)) + 1 : 1;

    const ordenParaAgregar = {
      id: nuevoId,
      cliente: formulario.cliente,
      producto: formulario.producto,
      total: formulario.total,
      estado: formulario.estado,
    };

    // 3.3. Actualiza la tabla y limpia el formulario
    setOrdenes([...ordenes, ordenParaAgregar]);
    setFormulario({ cliente: "", producto: "", total: "", estado: "" });
  };

  return (
    <div>
      <h2 className="page-title">Gestión de Ordenes</h2>

      {/* Botón de acción*/}
      <button
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
        className="btn btn-success"
        style={{ marginBottom: "15px" }}
      >
        {mostrarFormulario ? "Cancelar" : "+ Nueva Orden"}
      </button>

      {/* BLOQUE 1: ZONA DE CAPTURA*/}
      {mostrarFormulario && (
        <form onSubmit={guardarOrden} className="form-container">
          <h3 className="form-title">Gestión de Órdenes</h3>

          <div className="form-group">
            <input
              type="text"
              name="cliente"
              placeholder="Cliente"
              value={formulario.cliente}
              onChange={manejarCambio}
              className="form-input"
            />

            <input
              type="text"
              name="producto"
              placeholder="Producto"
              value={formulario.producto}
              onChange={manejarCambio}
              className="form-input"
            />

            <input
              type="number"
              name="total"
              placeholder="Total ($)"
              value={formulario.total}
              onChange={manejarCambio}
              className="form-input"
            />

            <select
              name="estado"
              value={formulario.estado}
              onChange={manejarCambio}
              className="form-input"
            >
              <option value="">Seleccione Estado...</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Aprobada">Aprobada</option>
              <option value="Denegada">Denegada</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success btn-submit">
            Guardar Orden
          </button>
        </form>
      )}

      {/* Tabla de datos */}

      <table className="table-custom">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Producto</th>
            <th>Total</th>
            <th>Estado</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        {/* Iteracion de los datos */}
        <tbody>
          {ordenes.map((orden) => (
            <tr key={orden.id}>
              <td>{orden.id}</td>
              <td>{orden.cliente}</td>
              <td>{orden.producto}</td>
              <td>${orden.total}</td>
              <td>{orden.estado}</td>
              <td className="text-center">
                <button className="btn btn-warning">Editar</button>
                <button
                  onClick={() => eliminarOrden(orden.id)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
