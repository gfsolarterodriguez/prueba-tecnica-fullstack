import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const API_URL = "http://localhost:8000/api/clientes";

export function Clientes() {
  // 1. Estado inicial vacío.
  const [clientes, setClientes] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  // 1.1. Cargar datos de la API al iniciar
  useEffect(() => {
    obtenerClientes();
  }, []);

  // 1.1.1. Cargar datos de la API al iniciar
  const obtenerClientes = async () => {
    const respuesta = await axios.get(API_URL);
    setClientes(respuesta.data);
  };

  // 1.2. Estado para el formulario
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    telefono: "",
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
  const guardarCliente = async (e) => {
    e.preventDefault(); // Evita que la página recargue al enviar el form

    // 2.1.1. Validar que no haya campos vacíos
    if (!formulario.nombre || !formulario.email || !formulario.telefono) {
      alert("Por favor llena todos los campos");
      return;
    }
    try {
      if (editandoId) {
        const respuesta = await axios.put(`${API_URL}/${editandoId}`, formulario);

        // Agregamos la respuesta a la lista
        // Actualizamos la lista local
        setClientes(clientes.map(c => c.id === editandoId ? respuesta.data : c));
        setFormulario({ nombre: '', email: '', telefono: '' });
        setMostrarFormulario(false);
        setEditandoId(null);
      } else {
        // Creacion de POST
        const respuesta = await axios.post(API_URL, formulario);
        setClientes([...clientes, respuesta.data]);
      }

      // Limpiamos el formulario
      setFormulario({ nombre: '', email: '', telefono: '' });
      setMostrarFormulario(false);
    } catch(error){
      alert("Error al guardar en la base de datos");
    }
  };

  // 3. ELIMINAR CLIENTE
  const eliminarCliente = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este cliente?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        // Quitamos de la vista el que acabamos de borrar en la DB
        setClientes(clientes.filter((c) => c.id !== id));
      } catch (error) {
        alert("No se pudo eliminar el cliente");
      }
    }
  };

  // 4. Cargar datos del cliente en el formulario para editarlos
  const cargarParaEditar = (cliente) => {
    setFormulario({ nombre: cliente.nombre, email: cliente.email, telefono: cliente.telefono });
    setEditandoId(cliente.id);
    setMostrarFormulario(true);
  };

  return (
    <div>
      <h2 className="page-title">Gestión de Clientes</h2>

      {/* Botón de acción*/}
      <button
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
        className="btn btn-success"
        style={{ marginBottom: "15px" }}
      >
        {mostrarFormulario ? "Cancelar" : "+ Nuevo Cliente"}
      </button>

      {/* BLOQUE 1: ZONA DE CAPTURA*/}
      {mostrarFormulario && (
        <form onSubmit={guardarCliente} className="form-container">
          <h3 className="form-title">Agregar Cliente</h3>
          <div className="form-group">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              className="form-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formulario.email}
              onChange={manejarCambio}
              className="form-input"
            />
            <input
              type="text"
              name="telefono"
              placeholder="Teléfono"
              value={formulario.telefono}
              onChange={manejarCambio}
              className="form-input"
            />
          </div>
          <button type="submit" className="btn btn-success btn-submit">
            Guardar Cliente
          </button>
        </form>
      )}

      {/* Tabla de datos */}

      <table className="table-custom">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        {/* Iteracion de los datos */}
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefono}</td>
              <td className="text-center">
                <button onClick={() => cargarParaEditar(cliente)} className="btn btn-warning">Editar</button>

                <button
                  onClick={() => eliminarCliente(cliente.id)}
                  className="btn btn-danger"
                >
                  {" "}
                  Eliminar{" "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
