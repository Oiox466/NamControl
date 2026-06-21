import React from 'react';

export default function ProductCard({ producto }) {
  return (
    <div className="tarjeta-producto">
      <button className="boton-cerrar">✕</button>
      <div className="producto-imagen-lateral">🛒</div>
      <div className="producto-info-lateral">
        <h4 className="tarjeta-titulo">{producto.nombre}</h4>
        <p className="info-linea"><span className="info-label">Precio</span> {producto.precio}</p>
        <p className="info-linea"><span className="info-label">Tipo Producto</span> Genérico</p>
        <p className="info-linea">
          <span className="info-label">Existencias</span>{' '}
          {producto.stock.startsWith('0') ? 'Agotado' : producto.stock}
        </p>
      </div>
    </div>
  );
}