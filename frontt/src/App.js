import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Puesto from './pages/Puesto'; // <-- NUEVO IMPORT

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-sans">
        <nav className="bg-orange-500 text-white p-4 shadow-md flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-wider">🏪 TianguisStock</Link>
          <Link to="/login" className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-orange-50 transition">
            Soy Comerciante
          </Link>
        </nav>

        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* RUTA DINÁMICA: El :idPuesto puede cambiar a /puesto/1, /puesto/2, etc. */}
            <Route path="/puesto/:idPuesto" element={<Puesto />} />
            
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;