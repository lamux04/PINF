import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { CarreraController } from '../controllers/carrera.js';

export const CarreraRouter = Router();

import { validateRequest } from "../middlewares/validateRequest.js";
import { z } from 'zod';

// Esquema de validación para la solicitud GET
const carreraSchemeGet = z.object({
    plantilla: z.string().length(36)
});

// Esquema de validación para la solicitud POST
const carreraSchemePost = z.object({
    plantilla: z.string().length(36),
    nombre: z.string().max(100)
});

// Esquema de validación para la solicitud PATCH
const carreraSchemePatch = z.object({
    plantilla: z.string().length(36).optional(),
    nombre: z.string().max(100).optional()
});

// Ruta GET para obtener carreras de una plantilla específica
// Precondición: Se debe enviar una plantilla válida en la solicitud.
// Postcondición: Devuelve todas las carreras asociadas a la plantilla especificada.
CarreraRouter.get('/', authMiddleware, validateRequest(carreraSchemeGet), CarreraController.getByPlantiilla);

// Ruta GET para obtener una carrera específica mediante su código
// Precondición: Se debe proporcionar el código de la carrera en la URL.
// Postcondición: Devuelve los detalles de la carrera especificada por el código.
CarreraRouter.get('/:carre_cod', authMiddleware, CarreraController.getByCodigo);

// Ruta POST para crear una nueva carrera
// Precondición: Se debe proporcionar un nombre y una plantilla en el cuerpo de la solicitud.
// Postcondición: Crea una nueva carrera asociada a la plantilla y devuelve su código.
CarreraRouter.post('/', authMiddleware, validateRequest(carreraSchemePost), CarreraController.create);

// Ruta PATCH para actualizar los detalles de una carrera existente
// Precondición: Se debe proporcionar el código de la carrera en la URL y los campos a actualizar en el cuerpo de la solicitud.
// Postcondición: Actualiza la carrera especificada con los nuevos datos proporcionados.
CarreraRouter.patch('/:carre_cod', authMiddleware, validateRequest(carreraSchemePatch), CarreraController.update);

// Ruta DELETE para eliminar una carrera
// Precondición: Se debe proporcionar el código de la carrera en la URL.
// Postcondición: Elimina la carrera especificada del sistema.
CarreraRouter.delete('/:carre_cod', authMiddleware, CarreraController.delete);
