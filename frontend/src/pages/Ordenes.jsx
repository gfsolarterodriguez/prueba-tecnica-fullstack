import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const API_URL = "http://localhost:8000/api/orders";
const CUSTOMERS_API = "http://localhost:8000/api/customers";

export function Ordenes() {
  // 1. Estado inicial vacío.
  const [ordenes, setOrdenes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  // 1.1. Estado para el formulario
  useEffect(() => {
    obtenerDatos();
  }, []);

  // 1.1.1. Estado para mostrar/ocultar el formulario
  // Ajustado para traer tanto órdenes como clientes
  const obtenerDatos = async () => {
      try {
        const [resOrdenes, resClientes] = await Promise.all([
            axios.get(API_URL),
            axios.get(CUSTOMERS_API)
        ]);
        setOrdenes(resOrdenes.data);
        setClientes(resClientes.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
  
  
  // 1.2. Estado para el formulario
  const [formulario, setFormulario] = useState({
    customer_id: "",
    orderNumber: "",
    totalAmount: "",
    status: "",
    notes: ""
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
    if (!formulario.customer_id || !formulario.orderNumber || !formulario.totalAmount || !formulario.status) {
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
      setFormulario({ customer_id: "", orderNumber: "", totalAmount: "", status: "", notes: "" });
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
      customer_id: orden.customer_id, 
      orderNumber: orden.orderNumber, 
      totalAmount: orden.totalAmount, 
      status: orden.status,
      notes: orden.notes || ""
    });
    setEditandoId(orden.id);
    setMostrarFormulario(true);
  };

  return (
    <div>
      <h2 className="page-title">Listado de Órdenes</h2>

      {/* Botón de acción*/}
      <button
        onClick={() => {
            setMostrarFormulario(!mostrarFormulario);
            setEditandoId(null);
            setFormulario({ customer_id: "", orderNumber: "", totalAmount: "", status: "", notes: "" });
        }}
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
            {/* Este Select muestra los clientes de la DB */}
            <select
              name="customer_id"
              value={formulario.customer_id}
              onChange={manejarCambio}
              className="form-input"
            >
              <option value="">Seleccione Cliente...</option>
              {clientes.map(c => (
                  <option key={c.id} value={c.id}>{c.fullName}</option>
              ))}
            </select>

            <input
              type="text"
              name="orderNumber"
              placeholder="Número de Orden"
              value={formulario.orderNumber}
              onChange={manejarCambio}
              className="form-input"
            />

            <input
              type="number"
              name="totalAmount"
              placeholder="Total ($)"
              value={formulario.totalAmount}
              onChange={manejarCambio}
              className="form-input"
            />

            <select
              name="status"
              value={formulario.status}
              onChange={manejarCambio}
              className="form-input"
            >
              <option value="">Seleccione Estado...</option>
              <option value="CREATED">CREATED</option>
              <option value="PAID">PAID</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>

            <input
              type="text"
              name="notes"
              placeholder="Notas (opcional)"
              value={formulario.notes}
              onChange={manejarCambio}
              className="form-input"
            />
          </div>
          <button type="submit" className="btn btn-success btn-submit">
            {editandoId ? "Actualizar Orden" : "Guardar Orden"}
          </button>
        </form>
      )}

      {/* Tabla de datos */}

      <table className="table-custom">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th># Orden</th>
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

              {/* Mostramos el nombre del cliente relacionado */}

              <td>{orden.customer?.fullName || "Sin asignar"}</td>
              <td>{orden.orderNumber}</td>
              <td>${orden.totalAmount}</td>
              <td>{orden.status}</td>
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