import { Router } from "express";
export const HorarioRouter = Router();
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { HorarioController } from "../controllers/horario.js";

import { validateRequest } from "../middlewares/validateRequest.js";
import { z } from 'zod';

const horarioVisualizarScheme = z.object({
    horario: z.string().length(36)
})

HorarioRouter.get('/', authMiddleware, HorarioController.getAll)
HorarioRouter.get('/:horar_cod', authMiddleware, HorarioController.getByCodigo)
HorarioRouter.post('/', authMiddleware, HorarioController.create)
HorarioRouter.post('/visualizar', authMiddleware, validateRequest(horarioVisualizarScheme), HorarioController.visualizar)
HorarioRouter.delete('/visualizar', authMiddleware, validateRequest(horarioVisualizarScheme), HorarioController.noVisualizar)
HorarioRouter.delete('/:horar_cod', authMiddleware, HorarioController.delete)