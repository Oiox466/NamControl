import { Router } from 'express';
import { getPuestosHome, getPuestoDetalle } from '../controllers/tianguisController.js';

const router = Router();

router.get('/puestos', getPuestosHome);
router.get('/puesto/:id_comerciante', getPuestoDetalle);

export default router;