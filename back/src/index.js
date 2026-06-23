import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getConnection } from './config/db.js';
import authRoutes from './routes/authRoutes.js'; // <-- Importamos las rutas
import productoRoutes from './routes/productoRoutes.js';
import tianguisRoutes from './routes/tianguisRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Enlazar las rutas de autenticación
app.use('/api/auth', authRoutes); // <-- Conectamos el endpoint
app.use('/api/productos', productoRoutes);
app.use('/api/tianguis', tianguisRoutes);

// Probar conexión a la BD al arrancar
getConnection()
  .then(() => console.log('Conexión exitosa a Microsoft SQL Server'))
  .catch((err) => console.error('No se pudo iniciar el servidor debido a fallas en la BD:', err));

app.get('/api/test', (req, res) => {
  res.json({ mensaje: 'Servidor corriendo y listo' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});