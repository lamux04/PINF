import { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { CursoController } from "../controllers/curso.js"

export const CursoRouter = Router()

CursoRouter.get('/', authMiddleware, CursoController.getAll)
CursoRouter.get('/:curso_cod', authMiddleware, CursoController.getByCodigo)
CursoRouter.post('/', authMiddleware, CursoController.create)
CursoRouter.patch('/:curso_cod', authMiddleware, CursoController.update)
CursoRouter.delete('/:curso_cod', authMiddleware, CursoController.delete)