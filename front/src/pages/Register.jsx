import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaStore } from 'react-icons/fa6';

function Register() {
  const [nombrePuesto, setNombrePuesto] = useState('');
  const [comerciante, setComerciante] = useState('');
  const [categoria, setCategoria] = useState('1'); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!nombrePuesto || !comerciante || !password) {
      setError('Por favor, llena todos los campos obligatorios.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_puesto: nombrePuesto,
          nombre_comerciante: comerciante,
          id_categoria: parseInt(categoria),
          password: password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Hubo un error al registrar el puesto.');
      }

      // Si todo sale bien, guardamos sesión local y navegamos al dashboard
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('nombrePuesto', nombrePuesto);
      localStorage.setItem('idComerciante', data.id_comerciante || data.id); 
      
      navigate('/dashboard');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="contenedor-auth">
      <div className="auth-header">
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#243474', display: 'flex', justifyContent: 'center' }}>
          <FaStore />
        </div>
        <h2>Registra tu Puesto</h2>
        <p>Únete al tianguis digital y publica tu stock hoy mismo.</p>
      </div>

      {error && <div className="alerta-error" style={{ textAlign: 'center' }}>{error}</div>}

      <form onSubmit={handleRegister}>
        <div className="grupo-formulario">
          <label>Nombre de tu Puesto *</label>
          <input
            type="text"
            placeholder="Ej. El Palacio de las Papas"
            className="input-control"
            value={nombrePuesto}
            onChange={(e) => setNombrePuesto(e.target.value)}
          />
        </div>

        <div className="grupo-formulario">
          <label>Tu Nombre (Comerciante) *</label>
          <input
            type="text"
            placeholder="Ej. Don Chencho"
            className="input-control"
            value={comerciante}
            onChange={(e) => setComerciante(e.target.value)}
          />
        </div>

        <div className="grupo-formulario">
          <label>Giro / Categoría</label>
          <select
            className="input-control"
            style={{ backgroundColor: '#fff', cursor: 'pointer' }}
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="1">Canasta Básica y Alimentos sin procesar</option>
            <option value="2">Comidas, Bebidas y Antojitos</option>
            <option value="3">Artículos del Hogar y Herramientas</option>
            <option value="4">Ropa, Calzado y Textiles</option>
            <option value="5">Novedades, Electrónica y Chácharas</option>
          </select>
        </div>

        <div className="grupo-formulario">
          <label>Crea una Contraseña *</label>
          <input
            type="password"
            placeholder="••••••••"
            className="input-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-primario btn-verde" style={{ marginTop: '0.5rem' }}>
          Crear Puesto e Ingresar
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" style={{ color: '#243474', fontWeight: 'bold', textDecoration: 'none' }}>
          Inicia sesión aquí
        </Link>
      </div>
    </div>
  );
}

export default Register;