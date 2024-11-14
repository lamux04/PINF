import { Router } from 'express';
import { AsignaturaController } from '../controllers/asignatura.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

export const AsignaturaRouter = Router();

AsignaturaRouter.get('/', authMiddleware, AsignaturaController.getAsignaturas);
AsignaturaRouter.get('/:asig_cod', authMiddleware, AsignaturaController.getAsignatura);
AsignaturaRouter.post('/', authMiddleware, AsignaturaController.postAsignatura);
AsignaturaRouter.patch('/:asig_cod', authMiddleware, AsignaturaController.patchAsignatura);
AsignaturaRouter.delete('/:asig_cod', authMiddleware, AsignaturaController.deleteAsignatura);