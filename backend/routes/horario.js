import { Router } from "express";
export const HorarioRouter = Router();
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { HorarioController } from "../controllers/horario.js";

HorarioRouter.get('/', authMiddleware, HorarioController.getAll)
HorarioRouter.get('/:horar_cod', authMiddleware, HorarioController.getByCodigo)
HorarioRouter.post('/', authMiddleware, HorarioController.create)
HorarioRouter.delete('/:horar_cod', authMiddleware, HorarioController.delete)
HorarioRouter.post('/visualizar', authMiddleware, HorarioController.visualizar)