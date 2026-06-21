import React, { useState } from 'react';
import TianguisCard from '../components/TianguisCard';

const mockTianguis = [
  { id: 1, nombrePuesto: "El Palacio de las Papas", comerciante: "Don Chencho", categoria: "Frutas y Verduras" },
  { id: 2, nombrePuesto: "Novedades y Ropa 'La Güera'", comerciante: "Doña Mary", categoria: "Ropa y Calzado" },
  { id: 3, nombrePuesto: "Abarrotes 'El Primo'", comerciante: "Carlos", categoria: "Semillas y Secos" }
];

export default function Home() {
  const [busqueda, setBusqueda] = useState('');

  const puestosFiltrados = mockTianguis.filter(puesto =>
    puesto.nombrePuesto.toLowerCase().includes(busqueda.toLowerCase()) ||
    puesto.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ padding: '2.5rem 1rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 className="titulo-seccion">Locales</h1>
        </div>

        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <input
            type="text"
            placeholder="🔍 Busca por puesto o categoría..."
            style={{
              width: '100%',
              maxWidth: '500px',
              padding: '1rem',
              borderRadius: '0.75rem',
              border: '1px solid #ccc',
              fontSize: '1.125rem'
            }}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {puestosFiltrados.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
            No se encontraron puestos.
          </p>
        ) : (
          <div className="grid-locales">
            {puestosFiltrados.map((puesto) => (
              <TianguisCard key={puesto.id} puesto={puesto} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}