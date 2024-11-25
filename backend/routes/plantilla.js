import { Router } from "express"
export const PlantillaRouter = Router()
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { PlantillaController } from "../controllers/plantilla.js"

import { validateRequest } from "../middlewares/validateRequest.js";
import { z } from 'zod';

const plantillaSchemePost = z.object({
    nombre: z.string()
})

const plantillaSchemePatch = z.object({
    nombre: z.string().optional()
})

PlantillaRouter.get('/', authMiddleware, PlantillaController.getAll)
PlantillaRouter.get('/lista_plantillas', authMiddleware, PlantillaController.getLista)
PlantillaRouter.get('/:plant_cod', authMiddleware, PlantillaController.getByCodigo)
PlantillaRouter.post('/', authMiddleware, validateRequest(plantillaSchemePost), PlantillaController.create)
PlantillaRouter.patch('/:plant_cod', authMiddleware, validateRequest(plantillaSchemePatch), PlantillaController.update)
PlantillaRouter.delete('/:plant_cod', authMiddleware, PlantillaController.delete)