import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Clientes } from './pages/Clientes';
import { Ordenes } from './pages/Ordenes';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        {/* Menú de Navegación Superior */}
        <nav className="nav-container">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Inicio
          </NavLink>
          <NavLink to="/clientes" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Clientes
          </NavLink>
          <NavLink to="/ordenes" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Órdenes
          </NavLink>
        </nav>

        {/* Zona dinámica donde se inyectan los componentes */}
        <Routes>
          <Route path="/" element={<h2>Bienvenido al Sistema de Gestión</h2>} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/ordenes" element={<Ordenes />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App