import { Router } from "express"
export const PlantillaRouter = Router()
import { authMiddleware } from "../middlewares/authMiddleware"
import { PlantillaController } from "../controllers/plantilla"

PlantillaRouter.get('/', authMiddleware, PlantillaController.getAll)