import { useState } from "react";
export function Clientes() {
  // 1. Datos simulados (Mock Data).
  const [clientes, setClientes] = useState([
    { id: 1, nombre: "Gian Solarte", email: "g.f.solarterodriguez@gmail.com", telefono: "3009876543",},
    { id: 2, nombre: "Ana Gómez", email: "ana@empresa.com", telefono: "3119876543",},
    { id: 3, nombre: "Juan Pérez", email: "juan@empresa.com", telefono: "3001234567",},
    { id: 4, nombre: "Carlos Ruiz", email: "carlos@empresa.com", telefono: "3205554433",},
  ]);
  // 1.1. Estado para el formulario
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });

  // 1.1.1. Estado para mostrar/ocultar el formulario
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // 2. Función para eliminar
  const eliminarCliente = (idParaBorrar) => {
    // filter() crea un arreglo nuevo con todos los clientes EXCEPTO el que coincida con el id
    const nuevaLista = clientes.filter(
      (cliente) => cliente.id !== idParaBorrar,
    );
    // setClientes avisa a React y redibuja la tabla
    setClientes(nuevaLista);
  };

  // 3. Captura lo que escribes en los inputs
  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  // 3.1. Guarda el nuevo cliente en la tabla
  const guardarCliente = (e) => {
    e.preventDefault(); // Evita que la página recargue al enviar el form
  
    // 3.1.1. Validar que no haya campos vacíos
    if (!formulario.nombre || !formulario.email || !formulario.telefono) {
      alert("Por favor llena todos los campos");
      return;
    }

    // 3.2. Crear un ID temporal
    const nuevoId =
      clientes.length > 0 ? Math.max(...clientes.map((c) => c.id)) + 1 : 1;

    const clienteParaAgregar = {
      id: nuevoId,
      nombre: formulario.nombre,
      email: formulario.email,
      telefono: formulario.telefono,
    };

    // 3.3. Actualiza la tabla y limpia el formulario
    setClientes([...clientes, clienteParaAgregar]);
    setFormulario({ nombre: "", email: "", telefono: "" });
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
                <button className="btn btn-warning">Editar</button>

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
