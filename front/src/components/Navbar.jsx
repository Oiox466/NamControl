import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar-global">
      <Link to="/" className="navbar-brand">🏪 TianguisStock</Link>
      <div>
        <Link to="/login" className="navbar-btn">
          Soy Comerciante
        </Link>
      </div>
    </nav>
  );
}