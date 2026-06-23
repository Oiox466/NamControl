import React from 'react';

export default function ProductCard({ producto }) {
  return (
    <div className="tarjeta-producto" style={{ position: 'relative' }}>
      
      {/* Icono dinámico: Si el producto es estrella, cambia el carrito por una estrella brillante */}
      <div className="producto-imagen-lateral">
        {producto.destacado ? '⭐' : '🛒'}
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
          <span className="info-label">Precio</span> ${producto.precio.toFixed(2)}
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