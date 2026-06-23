import { getConnection, mssql } from '../config/db.js';
import bcrypt from 'bcryptjs';

export const registrarComerciante = async (req, res) => {
  const { nombre_puesto, nombre_comerciante, id_categoria, password } = req.body;

  // 1. Validar que vengan todos los campos obligatorios
  if (!nombre_puesto || !nombre_comerciante || !id_categoria || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    const pool = await getConnection();

    // 2. Encriptar la contraseña (seguridad obligatoria)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. Insertar el comerciante en la base de datos usando consultas seguras con parámetros
    await pool.request()
      .input('nombre_puesto', mssql.VarChar(100), nombre_puesto)
      .input('nombre_comerciante', mssql.VarChar(100), nombre_comerciante)
      .input('id_categoria', mssql.Int, id_categoria)
      .input('password', mssql.VarChar(255), passwordHash)
      .query(`
        INSERT INTO comerciantes (nombre_puesto, nombre_comerciante, id_categoria, password)
        VALUES (@nombre_puesto, @nombre_comerciante, @id_categoria, @password)
      `);

    res.status(201).json({ mensaje: 'Comerciante registrado con éxito.' });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: 'Hubo un error en el servidor al registrar.' });
  }
};

export const loginComerciante = async (req, res) => {
    const { nombre_puesto, password } = req.body;

    // 1. Validar campos obligatorios
    if (!nombre_puesto || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    try {
        const pool = await getConnection();

        // 2. Buscar al comerciante por el nombre del puesto
        const resultado = await pool.request()
        .input('nombre_puesto', mssql.VarChar(100), nombre_puesto)
        .query('SELECT * FROM comerciantes WHERE nombre_puesto = @nombre_puesto');

        // Si no encuentra ningún registro con ese nombre de puesto
        if (resultado.recordset.length === 0) {
        return res.status(401).json({ error: 'El nombre del puesto o la contraseña son incorrectos.' });
        }

        const comerciante = resultado.recordset[0];

        // 3. Comparar la contraseña ingresada con el hash encriptado de la BD
        const passwordValido = await bcrypt.compare(password, comerciante.password);

        if (!passwordValido) {
        return res.status(401).json({ error: 'El nombre del puesto o la contraseña son incorrectos.' });
        }

        // 4. Si todo es correcto, responder con los datos de éxito
        res.json({
        mensaje: 'Inicio de sesión exitoso.',
        comerciante: {
            id_comerciante: comerciante.id_comerciante,
            nombre_puesto: comerciante.nombre_puesto,
            nombre_comerciante: comerciante.nombre_comerciante
        }
        });

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ error: 'Hubo un error en el servidor al iniciar sesión.' });
    }
};