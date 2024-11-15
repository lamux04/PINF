import { Router } from 'express'
import { ProfesorController } from '../controllers/profesor.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

export const ProfesorRouter = Router()

ProfesorRouter.get('/', authMiddleware, ProfesorController.getProfesores)
ProfesorRouter.get('/:prof_cod', authMiddleware, ProfesorController.getProfesor)
ProfesorRouter.post('/', authMiddleware, ProfesorController.createProfesor)
ProfesorRouter.patch('/:prof_cod', authMiddleware, ProfesorController.updateProfesor)
ProfesorRouter.delete('/:prof_cod', authMiddleware, ProfesorController.deleteProfesor)