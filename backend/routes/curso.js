import { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { CursoController } from "../controllers/curso.js"

export const CursoRouter = Router()

import { validateRequest } from "../middlewares/validateRequest.js";
import { z } from 'zod';

const cursoSchemeGet = z.object({
    carrera: z.string().length(36)
})

const cursoSchemePost = z.object({
    carrera: z.string().length(36),
    nombre: z.string()
})

const cursoSchemePatch = z.object({
    nombre: z.string().optional()
})

CursoRouter.get('/', authMiddleware, validateRequest(cursoSchemeGet), CursoController.getAll)
CursoRouter.get('/consultar_cursos/:curso_cod', authMiddleware, CursoController.getCursosByCodigo)
CursoRouter.get('/verificar/:curso_cod', authMiddleware, CursoController.verifyCurso)
CursoRouter.get('/ver_curso/:curso_cod', authMiddleware, CursoController.verCurso)
CursoRouter.get('/:curso_cod', authMiddleware, CursoController.getByCodigo)
CursoRouter.post('/', authMiddleware, validateRequest(cursoSchemePost), CursoController.create)
CursoRouter.patch('/:curso_cod', authMiddleware, validateRequest(cursoSchemePatch), CursoController.update)
CursoRouter.delete('/:curso_cod', authMiddleware, CursoController.delete)