import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Puesto() {
  const { idPuesto } = useParams();
  
  const [datosPuesto, setDatosPuesto] = useState(null);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);

  // --- ESTADOS PARA LA API EXTERNA DE MONEDAS ---
  const [moneda, setMoneda] = useState('MXN'); // Moneda base predeterminada
  const [tasasDeCambio, setTasasDeCambio] = useState({ MXN: 1, USD: 0.055, EUR: 0.051 }); // Tasas de respaldo

  // 1. LLAMADA A LA API DE TIANGUIS (BACK-END)
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

  // 2. CONSUMO DE LA API EXTERNA (EXCHANGERATE-API)
  useEffect(() => {
    const obtenerTasasDivisas = async () => {
      try {
        // Consultamos las equivalencias tomando el Peso Mexicano (MXN) como base
        const response = await fetch('https://open.er-api.com/v6/latest/MXN');
        if (response.ok) {
          const data = await response.json();
          // Guardamos las tasas de cambio de la API de terceros
          setTasasDeCambio(data.rates);
        }
      } catch (err) {
        console.warn('No se pudo conectar a la API de divisas, usando tasas de respaldo locales.', err);
      }
    };

    obtenerTasasDivisas();
  }, []);

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

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1 className="titulo-seccion">Productos</h1>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>
            Inventario actual de: <span style={{ fontWeight: 'bold', color: '#243474' }}>{datosPuesto.nombre_puesto}</span>
          </p>
          <span style={{ fontSize: '0.85rem', backgroundColor: '#e5e7eb', padding: '0.25rem 0.75rem', borderRadius: '1rem', color: '#4b5563', fontWeight: '500' }}>
            Tipo: {datosPuesto.nombre_categoria}
          </span>
        </div>

        {/* --- INTERFAZ SELECTOR DE DIVISAS (API EXTERNA) --- */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#4b5563' }}>Visualizar precios en:</span>
          <select 
            value={moneda} 
            onChange={(e) => setMoneda(e.target.value)}
            style={{ padding: '0.35rem 0.75rem', borderRadius: '0.5rem', border: '1px solid #ccc', backgroundColor: '#fff', fontSize: '0.875rem', fontWeight: '600', outline: 'none', cursor: 'pointer' }}
          >
            <option value="MXN">🇲🇽 MXN (Pesos)</option>
            <option value="USD">🇺🇸 USD (Dólares)</option>
            <option value="EUR">🇪🇺 EUR (Euros)</option>
          </select>
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
                  // Multiplicamos el precio base en pesos por la tasa de cambio seleccionada
                  precio: prod.precio * (tasasDeCambio[moneda] || 1),
                  stock: prod.stock,
                  destacado: prod.destacado,
                  divisa: moneda // Le pasamos el texto (MXN, USD, EUR) para que pinte el símbolo correcto
                }} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}