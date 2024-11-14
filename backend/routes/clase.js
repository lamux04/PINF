import { Router } from 'express';
import { ClaseController } from '../controllers/clase.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

export const ClaseRouter = Router();

ClaseRouter.get('/', authMiddleware, ClaseController.getClases);
ClaseRouter.get('/:clase_cod', authMiddleware, ClaseController.getClase);
ClaseRouter.post('/', authMiddleware, ClaseController.postClase);
ClaseRouter.patch('/:clase_cod', authMiddleware, ClaseController.patchClase);
ClaseRouter.delete('/:clase_cod', authMiddleware, ClaseController.deleteClase);
