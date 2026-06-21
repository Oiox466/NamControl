import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [nombrePuesto, setNombrePuesto] = useState('Mi Puesto');

  const [productos, setProductos] = useState([
    { id: 1, nombre: "Papa Alfa", stock: "45 kg", precio: "$22.00" },
    { id: 2, nombre: "Cebolla Bola", stock: "12 kg", precio: "$18.00" }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [formNombre, setFormNombre] = useState('');
  const [formStock, setFormStock] = useState('');
  const [formPrecio, setFormPrecio] = useState('');

  useEffect(() => {
    const logged = localStorage.getItem('isLoggedIn');
    const puestoGuardado = localStorage.getItem('nombrePuesto');
    if (!logged) {
      navigate('/login');
    } else if (puestoGuardado) {
      setNombrePuesto(puestoGuardado);
    }
  }, [navigate]);

  const handleOpenCrear = () => {
    setEditandoId(null);
    setFormNombre('');
    setFormStock('');
    setFormPrecio('');
    setIsModalOpen(true);
  };

  const handleOpenEditar = (prod) => {
    setEditandoId(prod.id);
    setFormNombre(prod.nombre);
    setFormStock(prod.stock);
    setFormPrecio(prod.precio);
    setIsModalOpen(true);
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    if (!formNombre || !formStock || !formPrecio) return alert('Llena todos los campos');

    if (editandoId) {
      setProductos(productos.map(p => 
        p.id === editandoId 
          ? { ...p, nombre: formNombre, stock: formStock, precio: formPrecio } 
          : p
      ));
    } else {
      const nuevoProducto = {
        id: Date.now(),
        nombre: formNombre,
        stock: formStock,
        precio: formPrecio.startsWith('$') ? formPrecio : `$${formPrecio}`
      };
      setProductos([...productos, nuevoProducto]);
    }
    setIsModalOpen(false);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Seguro que quieres eliminar este producto?')) {
      setProductos(productos.filter(p => p.id !== id));
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      <div className="header-dashboard">
        <div>
          <span className="tag-panel">Panel de Control</span>
          <h1 style={{ margin: '0.25rem 0 0 0', fontSize: '1.75rem', fontWeight: '900' }}>🏪 {nombrePuesto}</h1>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={handleOpenCrear} className="btn-primario btn-verde" style={{ width: 'auto', padding: '0.6rem 1.25rem' }}>
            + Agregar Producto
          </button>
          <button onClick={handleLogout} className="btn-danger">
            Salir
          </button>
        </div>
      </div>

      <div className="contenedor-tabla">
        <div className="tabla-titulo-barra">
          <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#374151' }}>Mi Stock Actual</h2>
        </div>

        {productos.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af', fontStyle: 'italic' }}>
            No tienes productos registrados. ¡Dale al botón de arriba para agregar el primero! 🚀
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="tabla-stock">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Stock disponible</th>
                  <th style={{ textAlign: 'center' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((prod) => (
                  <tr key={prod.id}>
                    <td style={{ fontWeight: 'bold' }}>{prod.nombre}</td>
                    <td style={{ color: '#6b7280' }}>{prod.precio}</td>
                    <td>
                      <span className="badge-stock">{prod.stock}</span>
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      <div className="acciones-flex" style={{ justifyContent: 'center' }}>
                        <button onClick={() => handleOpenEditar(prod)} className="btn-accion-tabla btn-editar">
                          ✏️ Editar
                        </button>
                        <button onClick={() => handleEliminar(prod.id)} className="btn-accion-tabla btn-eliminar">
                          🗑️ Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', fontWeight: '900' }}>
              {editandoId ? '✏️ Editar Producto' : '➕ Nuevo Producto'}
            </h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0 0 1.5rem 0' }}>
              Ingresa los datos para mantener actualizado tu stock.
            </p>

            <form onSubmit={handleGuardar}>
              <div className="grupo-formulario">
                <label>Nombre del Producto</label>
                <input
                  type="text"
                  placeholder="Ej. Jitomate Bola"
                  className="input-control"
                  value={formNombre}
                  onChange={(e) => setFormNombre(e.target.value)}
                />
              </div>

              <div className="grid-modal-2">
                <div className="grupo-formulario">
                  <label>Precio</label>
                  <input
                    type="text"
                    placeholder="Ej. 25.00"
                    className="input-control"
                    value={formPrecio}
                    onChange={(e) => setFormPrecio(e.target.value)}
                  />
                </div>
                <div className="grupo-formulario">
                  <label>Stock / Cantidad</label>
                  <input
                    type="text"
                    placeholder="Ej. 20 kg"
                    className="input-control"
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontWeight: 'bold' }}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primario" style={{ width: 'auto', padding: '0.6rem 1.25rem' }}>
                  {editandoId ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;