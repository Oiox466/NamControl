import { Router } from 'express';
import { 
  getProductosPorComerciante, 
  crearProducto, 
  actualizarProducto, 
  eliminarProducto 
} from '../controllers/productoController.js';

const router = Router();

router.get('/comerciante/:id_comerciante', getProductosPorComerciante);
router.post('/', crearProducto);
router.put('/:id_producto', actualizarProducto);
router.delete('/:id_producto', eliminarProducto);

export default router;