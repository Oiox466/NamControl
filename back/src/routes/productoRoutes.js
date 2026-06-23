import { Router } from 'express';
import { 
  getProductosPorComerciante, 
  crearProducto, 
  actualizarProducto, 
  eliminarProducto 
} from '../controllers/productoController.js';

const router = Router();

router.get('/comerciante/:id_comerciante', getProductosPorComerciante); // Obtener inventario
router.post('/', crearProducto);                                      // Agregar nuevo
router.put('/:id_producto', actualizarProducto);                      // Editar
router.delete('/:id_producto', eliminarProducto);                    // Eliminar

export default router;