import { Router } from 'express'
import { ProfesorController } from '../controllers/profesor.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

export const ProfesorRouter = Router()

import { validateRequest } from "../middlewares/validateRequest.js";
import { z } from 'zod';

const profesorSchemeGet = z.object({
    plantilla: z.string().length(36)
})

const profesorSchemePost = z.object({
    plantilla: z.string().length(36),
    nombre: z.string().min(1),
    apellido1: z.string().min(1),
    apellido2: z.string().min(1),
})

const profesorSchemePatch = z.object({
    nombre: z.string().min(1).optional(),
    apellido1: z.string().min(1).optional(),
    apellido2: z.string().min(1).optional(),
})

ProfesorRouter.get('/', authMiddleware, validateRequest(profesorSchemeGet), ProfesorController.getProfesores)
ProfesorRouter.get('/:prof_cod', authMiddleware, ProfesorController.getProfesor)
ProfesorRouter.post('/', authMiddleware, validateRequest(profesorSchemePost), ProfesorController.createProfesor)
ProfesorRouter.patch('/:prof_cod', authMiddleware, validateRequest(profesorSchemePatch), ProfesorController.updateProfesor)
ProfesorRouter.delete('/:prof_cod', authMiddleware, ProfesorController.deleteProfesor)