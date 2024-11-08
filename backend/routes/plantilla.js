import { Router } from "express"
export const PlantillaRouter = Router()
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { PlantillaController } from "../controllers/plantilla.js"

PlantillaRouter.get('/', authMiddleware, PlantillaController.getAll)
PlantillaRouter.get('/:plant_cod', authMiddleware, PlantillaController.getByCodigo)
PlantillaRouter.post('/', authMiddleware, PlantillaController.create)
PlantillaRouter.patch('/:plant_cod', authMiddleware, PlantillaController.update)
PlantillaRouter.delete('/:plant_cod', authMiddleware, PlantillaController.delete)