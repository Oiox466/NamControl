import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [nombrePuesto, setNombrePuesto] = useState('');
  const [comerciante, setComerciante] = useState('');
  const [categoria, setCategoria] = useState('Frutas y Verduras');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (!nombrePuesto || !comerciante || !password) {
      setError('Por favor, llena todos los campos obligatorios.');
      return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('nombrePuesto', nombrePuesto);
    navigate('/dashboard');
  };

  return (
    <div className="contenedor-auth">
      <div className="auth-header">
        <span style={{ fontSize: '2.5rem' }}>🏪</span>
        <h2>Registra tu Puesto</h2>
        <p>Únete al tianguis digital y publica tu stock hoy mismo.</p>
      </div>

      {error && <div className="alerta-error">⚠️ {error}</div>}

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
            style={{ backgroundColor: '#fff' }}
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="Frutas y Verduras">Frutas y Verduras</option>
            <option value="Ropa y Calzado">Ropa y Calzado</option>
            <option value="Semillas y Secos">Semillas y Secos</option>
            <option value="Comida Preparada">Comida Preparada</option>
            <option value="Otros">Otros</option>
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