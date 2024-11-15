import { Router } from 'express';
import { AsignaturaController } from '../controllers/asignatura.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

export const AsignaturaRouter = Router();

import { validateRequest } from "../middlewares/validateRequest.js";
import { z } from 'zod';

const asignaturaSchemeGet = z.object({
    curso: z.string().length(36)
})

const asignaturaSchemePost = z.object({
    curso: z.string().length(36),
    nombre: z.string(),
    aprobabilidad: z.number().int().min(0).max(1)
})

const asignaturaSchemePatch = z.object({
    nombre: z.string().optional(),
    aprobabilidad: z.number().int().min(0).max(1).optional()
})

AsignaturaRouter.get('/', authMiddleware, validateRequest(asignaturaSchemeGet), AsignaturaController.getAsignaturas);
AsignaturaRouter.get('/:asig_cod', authMiddleware, AsignaturaController.getAsignatura);
AsignaturaRouter.post('/', authMiddleware, validateRequest(asignaturaSchemePost), AsignaturaController.postAsignatura);
AsignaturaRouter.patch('/:asig_cod', authMiddleware, validateRequest(asignaturaSchemePatch), AsignaturaController.patchAsignatura);
AsignaturaRouter.delete('/:asig_cod', authMiddleware, AsignaturaController.deleteAsignatura);