import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [nombrePuesto, setNombrePuesto] = useState('Mi Puesto');
  const [idComerciante, setIdComerciante] = useState(null);
  
  // Estado inicializado vacío para recibir los datos de SQL Server
  const [productos, setProductos] = useState([]);

  // Controladores de interfaz y formulario
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [formNombre, setFormNombre] = useState('');
  const [formStock, setFormStock] = useState('');
  const [formPrecio, setFormPrecio] = useState('');
  const [formDestacado, setFormDestacado] = useState(false); // Nuevo estado para destacar

  // 1. CARGAR DATOS AL INICIAR EL COMPONENTE
  useEffect(() => {
    const logged = localStorage.getItem('isLoggedIn');
    const puestoGuardado = localStorage.getItem('nombrePuesto');
    const id = localStorage.getItem('idComerciante');

    if (!logged || !id) {
      navigate('/login');
    } else {
      setIdComerciante(id);
      if (puestoGuardado) setNombrePuesto(puestoGuardado);
      cargarProductos(id); // Trae el inventario real de la base de datos
    }
  }, [navigate]);

  // READ: Obtener productos desde el Back-end
  const cargarProductos = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/productos/comerciante/${id}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setProductos(data);
    } catch (err) {
      alert(err.message || 'Error al conectar con el inventario');
    }
  };

  const handleOpenCrear = () => {
    setEditandoId(null);
    setFormNombre('');
    setFormStock('');
    setFormPrecio('');
    setFormDestacado(false);
    setIsModalOpen(true);
  };

  const handleOpenEditar = (prod) => {
    // Los campos de la base de datos vienen mapeados como id_producto, nombre_producto, etc.
    setEditandoId(prod.id_producto);
    setFormNombre(prod.nombre_producto);
    setFormStock(prod.stock);
    setFormPrecio(prod.precio.toString());
    setFormDestacado(prod.destacado);
    setIsModalOpen(true);
  };

  // CREATE y UPDATE: Guardar datos en el servidor remoto
  const handleGuardar = async (e) => {
    e.preventDefault();
    if (!formNombre || formStock === '' || !formPrecio) return alert('Llena todos los campos');

    // Validación local preventiva para no saturar al servidor
    if (formDestacado) {
      const totalDestacados = productos.filter(p => p.destacado && p.id_producto !== editandoId).length;
      if (totalDestacados >= 3) {
        return alert('⚠️ No puedes destacar este producto. Ya alcanzaste el límite máximo de 3.');
      }
    }

    // Limpieza de datos numéricos
    const precioNumerico = parseFloat(formPrecio.replace(/[^0-9.]/g, ''));
    const stockNumerico = parseInt(formStock.toString().replace(/[^0-9]/g, ''));

    if (isNaN(precioNumerico) || isNaN(stockNumerico)) {
      return alert('Ingresa valores numéricos válidos en precio y stock');
    }

    const datosProducto = {
      id_comerciante: parseInt(idComerciante),
      nombre_producto: formNombre,
      descripcion: '', // Requerido por el backend
      precio: precioNumerico,
      stock: stockNumerico,
      destacado: formDestacado
    };

    try {
      let url = 'http://localhost:5000/api/productos';
      let metodo = 'POST';

      if (editandoId) {
        url = `http://localhost:5000/api/productos/${editandoId}`;
        metodo = 'PUT';
      }

      const response = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosProducto)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Ocurrió un error en la transacción.');

      setIsModalOpen(false);
      cargarProductos(idComerciante); // Recargar la tabla con la información actualizada
    } catch (err) {
      alert(err.message);
    }
  };

  // DELETE: Eliminar registro en base de datos
  const handleEliminar = async (id) => {
    if (window.confirm('¿Seguro que quieres eliminar este producto?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/productos/${id}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        
        cargarProductos(idComerciante); // Actualizar la tabla inmediatamente
      } catch (err) {
        alert(err.message);
      }
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
                  <th>Precio MXN</th>
                  <th>Stock disponible</th>
                  <th style={{ textAlign: 'center' }}>Destacado</th>
                  <th style={{ textAlign: 'center' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((prod) => (
                  <tr key={prod.id_producto}>
                    <td style={{ fontWeight: 'bold' }}>{prod.nombre_producto}</td>
                    <td style={{ color: '#6b7280' }}>${prod.precio.toFixed(2)}</td>
                    <td>
                      <span className="badge-stock">{prod.stock} pz</span>
                    </td>
                    <td style={{ textAlign: 'center', fontSize: '1.25rem' }}>
                      {prod.destacado ? '⭐' : '⚪'}
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      <div className="acciones-flex" style={{ justifyContent: 'center' }}>
                        <button onClick={() => handleOpenEditar(prod)} className="btn-accion-tabla btn-editar">
                          ✏️ Editar
                        </button>
                        <button onClick={() => handleEliminar(prod.id_producto)} className="btn-accion-tabla btn-eliminar">
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
                  <label>Precio ($MXN)</label>
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
                    placeholder="Ej. 20"
                    className="input-control"
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                  />
                </div>
              </div>

              {/* Implementación del requerimiento: Destacar productos */}
              <div className="grupo-formulario" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                <input
                  type="checkbox"
                  id="checkbox-destacado"
                  checked={formDestacado}
                  onChange={(e) => setFormDestacado(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="checkbox-destacado" style={{ margin: 0, cursor: 'pointer', fontWeight: 'bold' }}>
                  ⭐ Destacar este producto en el Tianguis (Máx. 3)
                </label>
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