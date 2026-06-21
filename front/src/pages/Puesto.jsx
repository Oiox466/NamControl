import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const mockTianguis = [
  {
    id: 1,
    nombrePuesto: "El Palacio de las Papas",
    comerciante: "Don Chencho",
    categoria: "Frutas y Verduras",
    productos: [
      { id: 101, nombre: "Papa Alfa", stock: "45 kg", precio: "$22.00/kg" },
      { id: 102, nombre: "Cebolla Bola", stock: "12 kg", precio: "$18.00/kg" },
      { id: 103, nombre: "Jitomate Saladet", stock: "0 kg", precio: "$28.00/kg" }
    ]
  },
  {
    id: 2,
    nombrePuesto: "Novedades y Ropa 'La Güera'",
    comerciante: "Doña Mary",
    categoria: "Ropa y Calzado",
    productos: [
      { id: 201, nombre: "Playeras tipo Polo", stock: "15 pzas", precio: "$120.00/c u" },
      { id: 202, nombre: "Calcetines (Paquete de 3)", stock: "40 pzas", precio: "$50.00" }
    ]
  }
];

export default function Puesto() {
  const { idPuesto } = useParams();
  const puesto = mockTianguis.find(p => p.id === parseInt(idPuesto));

  if (!puesto) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <p style={{ fontSize: '1.25rem', color: '#666' }}>🏪 Puesto no encontrado.</p>
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
            Inventario actual de: <span style={{ fontWeight: 'bold', color: '#243474' }}>{puesto.nombrePuesto}</span>
          </p>
        </div>

        <div className="lista-productos-vertical">
          {puesto.productos.map((prod) => (
            <ProductCard key={prod.id} producto={prod} />
          ))}
        </div>
      </div>
    </div>
  );
}