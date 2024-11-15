import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { CarreraController } from '../controllers/carrera.js';

export const CarreraRouter = Router();

import { validateRequest } from "../middlewares/validateRequest.js";
import { z } from 'zod';

const carreraSchemeGet = z.object({
    plantilla: z.string().length(36)
})

const carreraSchemePost = z.object({
    plantilla: z.string().length(36),
    nombre: z.string()
})

const carreraSchemePatch = z.object({
    plantilla: z.string().length(36).optional(),
    nombre: z.string().optional()
})

CarreraRouter.get('/', authMiddleware, validateRequest(carreraSchemeGet), CarreraController.getByPlantiilla);
CarreraRouter.get('/:carre_cod', authMiddleware, CarreraController.getByCodigo);
CarreraRouter.post('/', authMiddleware, validateRequest(carreraSchemePost), CarreraController.create);
CarreraRouter.patch('/:carre_cod', authMiddleware, validateRequest(carreraSchemePatch), CarreraController.update);
CarreraRouter.delete('/:carre_cod', authMiddleware, CarreraController.delete);