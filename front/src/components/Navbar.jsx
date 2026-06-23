import React from 'react';
import { Link } from 'react-router-dom';
import { FaStore } from 'react-icons/fa6';

export default function Navbar() {
  return (
    <nav className="navbar-global">
      <Link to="/" className="navbar-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <FaStore style={{ color: '#78c044' }} />
        TianguisStock
      </Link>
      <div>
        <Link to="/login" className="navbar-btn">
          Soy Comerciante
        </Link>
      </div>
    </nav>
  );
}