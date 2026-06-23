import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [nombrePuesto, setNombrePuesto] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!nombrePuesto || !password) {
      setError('Por favor, llena todos los campos.');
      return;
    }

    try {
      // Petición al Back-end
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_puesto: nombrePuesto,
          password: password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Muestra el error exacto que mande el controlador (ej: credenciales incorrectas)
        throw new Error(data.error || 'Error al iniciar sesión.');
      }

      // Si las credenciales son válidas, guardamos los datos en el navegador
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('idComerciante', data.comerciante.id_comerciante);
      localStorage.setItem('nombrePuesto', data.comerciante.nombre_puesto);
      
      // Redirección directa al Dashboard operativo
      navigate('/dashboard');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="contenedor-auth">
      <div className="auth-header">
        <span style={{ fontSize: '2.5rem' }}>🔐</span>
        <h2>Ingresa a tu Puesto</h2>
        <p>Gestiona tus productos y actualiza tu stock en tiempo real.</p>
      </div>

      {error && <div className="alerta-error">⚠️ {error}</div>}

      <form onSubmit={handleLogin}>
        <div className="grupo-formulario">
          <label>Nombre de tu Puesto</label>
          <input
            type="text"
            placeholder="Ej. El Palacio de las Papas"
            className="input-control"
            value={nombrePuesto}
            onChange={(e) => setNombrePuesto(e.target.value)}
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

        <button type="submit" className="btn-primario btn-verde" style={{ marginTop: '0.5rem' }}>
          Iniciar Sesión
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
        ¿Aún no tienes cuenta?{' '}
        <Link to="/register" style={{ color: '#243474', fontWeight: 'bold', textDecoration: 'none' }}>
          Regístrate aquí
        </Link>
      </div>
    </div>
  );
}

export default Login;