import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const logged = localStorage.getItem('isLoggedIn');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar-global">
      <Link to="/" className="navbar-brand">🏪 TianguisStock</Link>
      <div>
        {logged ? (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link to="/dashboard" className="navbar-btn" style={{ backgroundColor: '#243474', border: '1px solid #ffffff' }}>
              Mi Panel
            </Link>
            <button onClick={handleLogout} className="btn-danger" style={{ backgroundColor: '#ffffff', padding: '0.5rem 1rem' }}>
              Salir
            </button>
          </div>
        ) : (
          <Link to="/login" className="navbar-btn">
            Soy Comerciante
          </Link>
        )}
      </div>
    </nav>
  );
}