import React, { useState, useEffect } from 'react';
import TianguisCard from '../components/TianguisCard';
import { FaMagnifyingGlass } from 'react-icons/fa6'; // <-- Importamos el icono de la lupa

export default function Home() {
  const [busqueda, setBusqueda] = useState('');
  const [puestos, setPuestos] = useState([]);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerPuestosYEstrellas = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tianguis/puestos');
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.error || 'Error al obtener puestos.');
        
        setPuestos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerPuestosYEstrellas();
  }, []);

  const puestosFiltrados = puestos.filter(puesto =>
    puesto.nombre_puesto.toLowerCase().includes(busqueda.toLowerCase()) ||
    puesto.nombre_categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ padding: '2.5rem 1rem', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 className="titulo-seccion">Locales del Tianguis</h1>
        </div>

        {/* --- CONTENEDOR DEL BUSCADOR OPTIMIZADO --- */}
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
            {/* Icono de lupa posicionado de manera absoluta a la izquierda del input */}
            <FaMagnifyingGlass 
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af',
                fontSize: '1.1rem',
                pointerEvents: 'none'
              }} 
            />
            <input
              type="text"
              placeholder="Busca por puesto o categoría..."
              style={{
                width: '100%',
                padding: '1rem 1rem 1rem 2.75rem', /* Aumentamos el padding izquierdo para que el texto no pise la lupa */
                borderRadius: '0.75rem',
                border: '1px solid #ccc',
                fontSize: '1.125rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>

        {error && <div className="alerta-error" style={{ textAlign: 'center' }}>⚠️ {error}</div>}

        {cargando ? (
          <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>Abriendo puestos...</p>
        ) : puestosFiltrados.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>No se encontraron puestos.</p>
        ) : (
          <div className="grid-locales">
            {puestosFiltrados.map((puesto) => (
              <TianguisCard 
                key={puesto.id_comerciante} 
                puesto={{
                  id: puesto.id_comerciante, 
                  nombrePuesto: puesto.nombre_puesto,
                  comerciante: puesto.nombre_comerciante,
                  categoria: puesto.nombre_categoria,
                  estrellas: puesto.productos_estrella
                }} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}