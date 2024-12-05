import { Router } from 'express';
import { ClaseController } from '../controllers/clase.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

export const ClaseRouter = Router();

import { validateRequest } from "../middlewares/validateRequest.js";
import { z } from 'zod';

const claseSchemeGet = z.object({
    asignatura: z.string().length(36)
})

const claseSchemePost = z.object({
    asignatura: z.string().length(36),
    descripcion: z.string().max(100),
    tipo: z.string().max(20),
    tipo_aula: z.string().max(40),
    profesor: z.string().length(36),
    duracion: z.number().int().positive(),
    importante: z.boolean(),
})

const claseSchemePatch = z.object({
    descripcion: z.string().max(100).optional(),
    tipo: z.string().max(20).optional(),
    tipo_aula: z.string().max(40).optional(),
    profesor: z.string().length(36).optional(),
    duracion: z.number().int().positive().optional(),
    importante: z.boolean().optional(),
})

ClaseRouter.get('/', authMiddleware, validateRequest(claseSchemeGet), ClaseController.getClases);
ClaseRouter.get('/:clase_cod', authMiddleware, ClaseController.getClase);
ClaseRouter.post('/', authMiddleware, validateRequest(claseSchemePost), ClaseController.postClase);
ClaseRouter.patch('/:clase_cod', authMiddleware, validateRequest(claseSchemePatch), ClaseController.patchClase);
ClaseRouter.delete('/:clase_cod', authMiddleware, ClaseController.deleteClase);
