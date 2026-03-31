import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const API_URL = "http://localhost:8000/api/ordenes";

export function Ordenes() {
  // 1. Estado inicial vacío.
  const [ordenes, setOrdenes] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  // 1.1. Estado para el formulario
  useEffect(() => {
    obtenerOrdenes();
  }, []);

  // 1.1.1. Estado para mostrar/ocultar el formulario
  const obtenerOrdenes = async () => {
      const respuesta = await axios.get(API_URL);
      setOrdenes(respuesta.data);
    };
  
  
  // 1.2. Estado para el formulario
  const [formulario, setFormulario] = useState({
    cliente: "",
    producto: "",
    total: "",
    estado: "",
  });  

  // 1.2.1. Estado para mostrar/ocultar el formulario
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // 2. Captura lo que escribes en los inputs
  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  // 2.1. Guarda el nuevo cliente en la tabla
  const guardarOrden = async (e) => {
    e.preventDefault(); // Evita que la página recargue al enviar el form

    // 2.1.1. Validar que no haya campos vacíos
    if (!formulario.cliente || !formulario.producto || !formulario.total || !formulario.estado) {
      alert("Por favor llena todos los campos de la solicitud.");
      return;
    }
    try {
      if (editandoId) {
        // MODO EDICIÓN (PUT)
        const respuesta = await axios.put(`${API_URL}/${editandoId}`, formulario);
        // Actualizamos la lista local
        setOrdenes(ordenes.map(o => o.id === editandoId ? respuesta.data : o));
        setEditandoId(null);
      } else {
        // MODO CREACIÓN (POST)
        const respuesta = await axios.post(API_URL, formulario);
        setOrdenes([...ordenes, respuesta.data]);
      }
      
      // Limpiamos el formulario
      setFormulario({ cliente: "", producto: "", total: "", estado: "" });
      setMostrarFormulario(false);
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error en la base de datos.");
    }
  };
  
  // 3. ELIMINAR ORDEN
  const eliminarOrden = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta orden?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        // Usamos setOrdenes
        setOrdenes(ordenes.filter((o) => o.id !== id));
      } catch (error) {
        alert("No se pudo eliminar la orden");
      }
    }
  };

  // 4. Cargar datos de la orden en el formulario para editarla
  const cargarParaEditar = (orden) => {
    setFormulario({ 
      cliente: orden.cliente, 
      producto: orden.producto, 
      total: orden.total, 
      estado: orden.estado 
    });
    setEditandoId(orden.id);
    setMostrarFormulario(true);
  };

  return (
    <div>
      <h2 className="page-title">Listado de Órdenes</h2>

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
                <button onClick={() => cargarParaEditar(orden)} className="btn btn-warning">Editar</button>
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
