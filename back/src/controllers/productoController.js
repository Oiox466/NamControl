import { getConnection, mssql } from '../config/db.js';

// 1. OBTENER PRODUCTOS DE UN COMERCIANTE
export const getProductosPorComerciante = async (req, res) => {
  const { id_comerciante } = req.params;

  try {
    const pool = await getConnection();
    const resultado = await pool.request()
      .input('id_comerciante', mssql.Int, id_comerciante)
      .query('SELECT * FROM productos WHERE id_comerciante = @id_comerciante ORDER BY id_producto DESC');

    res.json(resultado.recordset);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener el inventario.' });
  }
};

// 2. AGREGAR UN PRODUCTO (CORREGIDO: Sin columna descripcion)
export const crearProducto = async (req, res) => {
  const { id_comerciante, nombre_producto, precio, stock, destacado } = req.body;

  // Validación de campos requeridos
  if (!id_comerciante || !nombre_producto || precio === undefined || stock === undefined) {
    return res.status(400).json({ error: 'Los campos obligatorios no pueden ir vacíos.' });
  }

  try {
    const pool = await getConnection();
    const esDestacado = destacado ? 1 : 0; 

    // VALIDACIÓN: Si intenta crearlo como destacado, revisar cuántos lleva
    if (esDestacado === 1) {
      const conteo = await pool.request()
        .input('id_comerciante', mssql.Int, id_comerciante)
        .query('SELECT COUNT(*) AS total FROM productos WHERE id_comerciante = @id_comerciante AND destacado = 1');
      
      if (conteo.recordset[0].total >= 3) {
        return res.status(400).json({ error: 'Ya tienes el máximo de 3 productos destacados permitido.' });
      }
    }

    // Consulta SQL ajustada estrictamente a tus columnas
    await pool.request()
      .input('id_comerciante', mssql.Int, id_comerciante)
      .input('nombre_producto', mssql.VarChar(100), nombre_producto)
      .input('precio', mssql.Decimal(10, 2), precio)
      .input('stock', mssql.Int, stock)
      .input('destacado', mssql.Bit, esDestacado)
      .query(`
        INSERT INTO productos (id_comerciante, nombre_producto, precio, stock, destacado)
        VALUES (@id_comerciante, @nombre_producto, @precio, @stock, @destacado)
      `);

    res.status(201).json({ mensaje: 'Producto agregado exitosamente.' });
  } catch (error) {
    console.error('--- ERROR DETALLADO EN SQL SERVER ---');
    console.error(error);
    console.error('-------------------------------------');
    res.status(500).json({ error: 'Error en el servidor al agregar producto.' });
  }
};

// 3. EDITAR UN PRODUCTO (CORREGIDO: Sin columna descripcion)
export const actualizarProducto = async (req, res) => {
  const { id_producto } = req.params;
  const { id_comerciante, nombre_producto, precio, stock, destacado } = req.body;

  try {
    const pool = await getConnection();
    const esDestacado = destacado ? 1 : 0;

    // VALIDACIÓN: Si cambia a destacado, verificar que no exceda los 3 (excluyendo este mismo producto)
    if (esDestacado === 1) {
      const conteo = await pool.request()
        .input('id_comerciante', mssql.Int, id_comerciante)
        .input('id_producto', mssql.Int, id_producto)
        .query('SELECT COUNT(*) AS total FROM productos WHERE id_comerciante = @id_comerciante AND destacado = 1 AND id_producto <> @id_producto');
      
      if (conteo.recordset[0].total >= 3) {
        return res.status(400).json({ error: 'No puedes destacar este producto. Ya alcanzaste el límite de 3.' });
      }
    }

    // Consulta SQL ajustada estrictamente a tus columnas
    await pool.request()
      .input('id_producto', mssql.Int, id_producto)
      .input('nombre_producto', mssql.VarChar(100), nombre_producto)
      .input('precio', mssql.Decimal(10, 2), precio)
      .input('stock', mssql.Int, stock)
      .input('destacado', mssql.Bit, esDestacado)
      .query(`
        UPDATE productos 
        SET nombre_producto = @nombre_producto, precio = @precio, stock = @stock, destacado = @destacado
        WHERE id_producto = @id_producto
      `);

    res.json({ mensaje: 'Producto actualizado con éxito.' });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error en el servidor al actualizar producto.' });
  }
};

// 4. ELIMINAR UN PRODUCTO
export const eliminarProducto = async (req, res) => {
  const { id_producto } = req.params;

  try {
    const pool = await getConnection();
    await pool.request()
      .input('id_producto', mssql.Int, id_producto)
      .query('DELETE FROM productos WHERE id_producto = @id_producto');

    res.json({ mensaje: 'Producto eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error en el servidor al eliminar producto.' });
  }
};