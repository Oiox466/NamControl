import { Router } from 'express';
import { getPuestosHome, getPuestoDetalle } from '../controllers/tianguisController.js';

const router = Router();

// Ruta para listar todos los puestos en la página principal
router.get('/puestos', getPuestosHome);
router.get('/puesto/:id_comerciante', getPuestoDetalle);

export default router;