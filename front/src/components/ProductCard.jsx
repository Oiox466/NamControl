import React from 'react';
import { FaStar, FaCartShopping } from 'react-icons/fa6';

export default function ProductCard({ producto }) {
  const obtenerSimboloMoneda = () => {
    if (!producto.divisa || producto.divisa === 'MXN') return '$';
    if (producto.divisa === 'USD') return 'USD $';
    if (producto.divisa === 'EUR') return 'EUR €';
    return '$';
  };

  return (
    <div className="tarjeta-producto" style={{ position: 'relative' }}>
      
      <div className="producto-imagen-lateral" style={{ color: '#ffffff' }}>
        {producto.destacado ? (
          <FaStar style={{ transform: 'scale(1.2)' }} />
        ) : (
          <FaCartShopping />
        )}
      </div>
      
      <div className="producto-info-lateral">
        <h4 className="tarjeta-titulo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {producto.nombre} 
          {producto.destacado && (
            <span style={{ fontSize: '0.85rem', color: '#d97706', backgroundColor: '#fef3c7', padding: '0.1rem 0.4rem', borderRadius: '0.25rem', fontWeight: 'bold' }}>
              Estrella
            </span>
          )}
        </h4>
        
        <p className="info-linea">
          <span className="info-label">Precio</span> {obtenerSimboloMoneda()}{producto.precio.toFixed(2)}
        </p>
        
        <p className="info-linea">
          <span className="info-label">Tipo Producto</span> {producto.destacado ? 'Destacado del Día' : 'Regular'}
        </p>
        
        <p className="info-linea">
          <span className="info-label">Existencias</span>{' '}
          {producto.stock === 0 ? (
            <span style={{ color: '#dc2626', fontWeight: 'bold' }}>Agotado</span>
          ) : (
            `${producto.stock} pz`
          )}
        </p>
      </div>
    </div>
  );
}