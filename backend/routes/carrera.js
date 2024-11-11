import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { CarreraController } from '../controllers/carrera.js';

export const CarreraRouter = Router();

CarreraRouter.get('/', authMiddleware, CarreraController.getByPlantiilla);
CarreraRouter.get('/:carre_cod', authMiddleware, CarreraController.getByCodigo);
CarreraRouter.post('/', authMiddleware, CarreraController.create);
CarreraRouter.patch('/:carre_cod', authMiddleware, CarreraController.update);
CarreraRouter.delete('/:carre_cod', authMiddleware, CarreraController.delete);