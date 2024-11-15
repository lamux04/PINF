import { Router } from 'express'
import { AulaController } from '../controllers/aula.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

export const AulaRouter = Router()

import { validateRequest } from "../middlewares/validateRequest.js";
import { z } from 'zod';

const aulaSchemeGet = z.object({
    plantilla: z.string().length(36)
})

const aulaSchemePost = z.object({
    plantilla: z.string().length(36),
    nombre: z.string().min(1),
    tipo: z.string().min(1),
})

const aulaSchemePatch = z.object({
    nombre: z.string().min(1).optional(),
    tipo: z.string().min(1).optional(),
})

AulaRouter.get('/', authMiddleware, validateRequest(aulaSchemeGet), AulaController.getAulas)
AulaRouter.get('/:aula_cod', authMiddleware, AulaController.getAula)
AulaRouter.post('/', authMiddleware, validateRequest(aulaSchemePost), AulaController.createAula)
AulaRouter.patch('/:aula_cod', authMiddleware, validateRequest(aulaSchemePatch), AulaController.updateAula)
AulaRouter.delete('/:aula_cod', authMiddleware, AulaController.deleteAula)