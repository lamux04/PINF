import { Router } from 'express'
import { AulaController } from '../controllers/aula.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

export const AulaRouter = Router()

AulaRouter.get('/', authMiddleware, AulaController.getAulas)
AulaRouter.get('/:aula_cod', authMiddleware, AulaController.getAula)
AulaRouter.post('/', authMiddleware, AulaController.createAula)
AulaRouter.patch('/:aula_cod', authMiddleware, AulaController.updateAula)
AulaRouter.delete('/:aula_cod', authMiddleware, AulaController.deleteAula)