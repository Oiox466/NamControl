import { getConnection, mssql} from '../config/db.js';

// GET /api/tianguis/puestos -> Obtener todos los puestos con sus productos estrella integrados
export const getPuestosHome = async (req, res) => {
  try {
    const pool = await getConnection();
    
    // Traemos los puestos y le incrustamos sus productos destacados mapeados como un arreglo JSON
    const resultado = await pool.request().query(`
      SELECT 
        c.id_comerciante, 
        c.nombre_puesto, 
        c.nombre_comerciante, 
        cat.nombre_categoria,
        (
          SELECT p.id_producto, p.nombre_producto, p.precio, p.stock
          FROM productos p
          WHERE p.id_comerciante = c.id_comerciante AND p.destacado = 1
          FOR JSON PATH
        ) AS productos_estrella
      FROM comerciantes c
      INNER JOIN categorias_catalogo cat ON c.id_categoria = cat.id_categoria
      ORDER BY c.nombre_puesto ASC
    `);

    // SQL Server regresa el JSON interno como String, hay que parsearlo antes de enviarlo a React
    const puestosFormateados = resultado.recordset.map(puesto => ({
      ...puesto,
      productos_estrella: puesto.productos_estrella ? JSON.parse(puesto.productos_estrella) : []
    }));

    res.json(puestosFormateados);
  } catch (error) {
    console.error('Error al obtener los puestos del tianguis:', error);
    res.status(500).json({ error: 'Error en el servidor al cargar los puestos.' });
  }
};

// GET /api/tianguis/puesto/:id_comerciante -> Obtener un puesto específico con todo su stock
export const getPuestoDetalle = async (req, res) => {
  const { id_comerciante } = req.params;

  try {
    const pool = await getConnection();

    // 1. Traer los datos del comerciante y su categoría
    const infoComerciante = await pool.request()
      .input('id_comerciante', mssql.Int, id_comerciante)
      .query(`
        SELECT c.id_comerciante, c.nombre_puesto, c.nombre_comerciante, cat.nombre_categoria
        FROM comerciantes c
        INNER JOIN categorias_catalogo cat ON c.id_categoria = cat.id_categoria
        WHERE c.id_comerciante = @id_comerciante
      `);

    if (infoComerciante.recordset.length === 0) {
      return res.status(404).json({ error: 'El puesto solicitado no existe.' });
    }

    // 2. Traer todos sus productos ordenados
    const productosPuesto = await pool.request()
      .input('id_comerciante', mssql.Int, id_comerciante)
      .query(`
        SELECT id_producto, nombre_producto, precio, stock, destacado
        FROM productos
        WHERE id_comerciante = @id_comerciante
        ORDER BY destacado DESC, nombre_producto ASC
      `);

    res.json({
      puesto: infoComerciante.recordset[0],
      productos: productosPuesto.recordset
    });

  } catch (error) {
    // IMPRESIÓN CLAVE EN LA TERMINAL DEL BACK
    console.error('--- ERROR DETALLADO EN PUESTO DETALLE ---');
    console.error(error);
    console.error('-----------------------------------------');
    
    res.status(500).json({ error: error.message || 'Error en el servidor.' });
  }
};