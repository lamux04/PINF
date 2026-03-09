import { Router } from "express";
export const HorarioRouter = Router();
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { HorarioController } from "../controllers/horario.js";

import { validateRequest } from "../middlewares/validateRequest.js";
import { z } from 'zod';

// Esquema de validación para la solicitud GET de visualizar horario
const horarioVisualizarScheme = z.object({
    horario: z.string().length(36)
});

// Esquema de validación para la solicitud POST de crear un horario
const horarioCrearScheme = z.object({
    nombre: z.string().max(50),
    h_ini: z.number().int().min(0).max(1439),
    h_fin: z.number().int().min(0).max(1439),
    inicio_desc: z.number().int().min(0).max(1439),
    fin_desc: z.number().int().min(0).max(1439),
    plantilla: z.string().length(36)
});

// Ruta GET para obtener todos los horarios
// Precondición: Ninguna.
// Postcondición: Devuelve una lista con todos los horarios.
HorarioRouter.get('/', authMiddleware, HorarioController.getAll);

// Ruta GET para obtener los horarios generados para una plantilla específica
// Precondición: Se debe proporcionar el código de la plantilla en la URL.
// Postcondición: Devuelve los horarios generados asociados a la plantilla especificada.
HorarioRouter.get('/horarios_generados/:plant_cod', authMiddleware, HorarioController.getHorariosGenerados);

// Ruta GET para verificar si un horario existe
// Precondición: Se debe proporcionar el código del horario en la URL.
// Postcondición: Devuelve una respuesta que indica si el horario existe o no.
HorarioRouter.get('/verificar/:horar_cod', authMiddleware, HorarioController.verificar);

// Ruta GET para obtener un horario específico mediante su código
// Precondición: Se debe proporcionar el código del horario en la URL.
// Postcondición: Devuelve el horario especificado por su código.
HorarioRouter.get('/:horar_cod', authMiddleware, HorarioController.getByCodigo);

// Ruta POST para crear un nuevo horario
// Precondición: Se deben proporcionar los detalles del horario en el cuerpo de la solicitud, incluyendo el nombre, tiempos, y plantilla.
// Postcondición: Crea un nuevo horario con los datos proporcionados.
HorarioRouter.post('/', authMiddleware, validateRequest(horarioCrearScheme), HorarioController.create);

// Ruta POST para visualizar un horario específico
// Precondición: Se debe proporcionar el código del horario en el cuerpo de la solicitud.
// Postcondición: Marca el horario como visualizado.
HorarioRouter.post('/visualizar', authMiddleware, validateRequest(horarioVisualizarScheme), HorarioController.visualizar);

// Ruta DELETE para dejar de visualizar un horario
// Precondición: Se debe proporcionar el código del horario en el cuerpo de la solicitud.
// Postcondición: Desmarca el horario como visualizado.
HorarioRouter.delete('/visualizar', authMiddleware, validateRequest(horarioVisualizarScheme), HorarioController.noVisualizar);

// Ruta DELETE para eliminar un horario específico
// Precondición: Se debe proporcionar el código del horario en la URL.
// Postcondición: Elimina el horario especificado.
HorarioRouter.delete('/:horar_cod', authMiddleware, HorarioController.delete);
