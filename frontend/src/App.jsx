import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Clientes } from './pages/Clientes';
import { Ordenes } from './pages/Ordenes';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        {/* Menú de Navegación Superior */}
        <nav style={{ marginBottom: '20px', paddingBottom: '15px', borderBottom: '2px solid #ccc' }}>
          <Link to="/" style={{ marginRight: '15px', textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Inicio</Link>
          <Link to="/clientes" style={{ marginRight: '15px', textDecoration: 'none', color: '#0056b3' }}>Clientes</Link>
          <Link to="/ordenes" style={{ textDecoration: 'none', color: '#0056b3' }}>Órdenes</Link>
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