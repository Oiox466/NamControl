import { Router } from 'express';
import { registrarComerciante, loginComerciante } from '../controllers/authController.js';

const router = Router();

// Endpoint para el registro: POST /api/auth/register
router.post('/register', registrarComerciante);
router.post('/login', loginComerciante);

export default router;