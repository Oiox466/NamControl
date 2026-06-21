import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TianguisCard({ puesto }) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/puesto/${puesto.id}`)} className="tarjeta-tianguis">
      <div className="tarjeta-header-verde">🛒</div>
      <div className="tarjeta-body">
        <h3 className="tarjeta-titulo">{puesto.nombrePuesto}</h3>
        <p className="tarjeta-subtitulo">Giro: {puesto.categoria}</p>
        
        <div>
          <p style={{ fontWeight: 'bold', fontSize: '0.875rem', margin: '0' }}>Productos estrella</p>
          <ul className="lista-estrella">
            <li>o) Producto A</li>
            <li>o) Producto B</li>
            <li>o) Producto C</li>
          </ul>
        </div>
        
        <p className="atendido-por">
          Atendido por: <span className="atendido-nombre">{puesto.comerciante}</span>
        </p>
      </div>
    </div>
  );
}