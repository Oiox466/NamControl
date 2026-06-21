import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [puesto, setPuesto] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!puesto || !password) {
      setError('Por favor, llena todos los campos.');
      return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('nombrePuesto', puesto);
    navigate('/dashboard');
  };

  return (
    <div className="contenedor-auth">
      <div className="auth-header">
        <span style={{ fontSize: '2.5rem' }}>🔑</span>
        <h2>Acceso Comerciante</h2>
        <p>Ingresa las credenciales de tu puesto para gestionar tu stock.</p>
      </div>

      {error && <div className="alerta-error">⚠️ {error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="grupo-formulario">
          <label>Nombre del Puesto / Usuario</label>
          <input
            type="text"
            placeholder="Ej. El Palacio de las Papas"
            className="input-control"
            value={puesto}
            onChange={(e) => setPuesto(e.target.value)}
          />
        </div>

        <div className="grupo-formulario">
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            className="input-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-primario">
          Ingresar al Panel
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
        ¿Aún no registras tu puesto?{' '}
        <Link to="/register" style={{ color: '#243474', fontWeight: 'bold', textDecoration: 'none' }}>
          Regístralo aquí
        </Link>
      </div>
    </div>
  );
}

export default Login;