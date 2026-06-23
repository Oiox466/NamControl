import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStore } from 'react-icons/fa6';

export default function TianguisCard({ puesto }) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/puesto/${puesto.id}`)} className="tarjeta-tianguis">
      
      <div className="tarjeta-header-verde" style={{ color: '#ffffff' }}>
        <FaStore style={{ transform: 'scale(1.1)' }} />
      </div>
      
      <div className="tarjeta-body">
        <h3 className="tarjeta-titulo">{puesto.nombrePuesto}</h3>
        <p className="tarjeta-subtitulo">Tipo: {puesto.categoria}</p>
        
        <div>
          <p style={{ fontWeight: 'bold', fontSize: '0.875rem', margin: '0' }}>Productos estrella</p>
          <ul className="lista-estrella">
            {puesto.estrellas && puesto.estrellas.length > 0 ? (
              puesto.estrellas.map((prod) => (
                <li key={prod.id_producto}>
                  🔸 {prod.nombre_producto}
                </li>
              ))
            ) : (
              <li style={{ listStyleType: 'none', fontStyle: 'italic', color: '#9ca3af' }}>
                Sin destacados por ahora
              </li>
            )}
          </ul>
        </div>
        
        <p className="atendido-por">
          Atendido por: <span className="atendido-nombre">{puesto.comerciante}</span>
        </p>
      </div>
    </div>
  );
}