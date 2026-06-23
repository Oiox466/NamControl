import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard'; // <-- Importas el hijo

export default function Puesto() {
  const { idPuesto } = useParams();
  
  const [datosPuesto, setDatosPuesto] = useState(null);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerDetallePuesto = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/tianguis/puesto/${idPuesto}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'No se pudo conectar con el puesto.');
        }

        setDatosPuesto(data.puesto);
        setProductos(data.productos);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerDetallePuesto();
  }, [idPuesto]);

  if (cargando) {
    return (
      <div style={{ textAlign: 'center', marginTop: '5rem', fontStyle: 'italic', color: '#666' }}>
        Consultando el inventario disponible en el puesto... 📋
      </div>
    );
  }

  if (error || !datosPuesto) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <p style={{ fontSize: '1.25rem', color: '#dc2626' }}>🏪 {error || 'Puesto no encontrado.'}</p>
        <Link to="/" style={{ color: '#243474', textDecoration: 'underline' }}>Regresar al inicio</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2.5rem 1rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link to="/" style={{ color: '#666', fontWeight: 'bold', textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' }}>
          ⬅ Volver a locales
        </Link>

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 className="titulo-seccion">Productos</h1>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>
            Inventario actual de: <span style={{ fontWeight: 'bold', color: '#243474' }}>{datosPuesto.nombre_puesto}</span>
          </p>
          <span style={{ fontSize: '0.85rem', backgroundColor: '#e5e7eb', padding: '0.25rem 0.75rem', borderRadius: '1rem', color: '#4b5563', fontWeight: '500' }}>
            Giro: {datosPuesto.nombre_categoria}
          </span>
        </div>

        {productos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#9ca3af', fontStyle: 'italic', marginTop: '2rem' }}>
            Este puesto se quedó sin mercancía por hoy. 🛒
          </p>
        ) : (
          <div className="lista-productos-vertical">
            {productos.map((prod) => (
              <ProductCard 
                key={prod.id_producto} 
                producto={{
                  id: prod.id_producto,
                  nombre: prod.nombre_producto,
                  precio: prod.precio,
                  stock: prod.stock,
                  destacado: prod.destacado
                }} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}