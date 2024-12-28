import { Router } from 'express';
import { ClaseController } from '../controllers/clase.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

export const ClaseRouter = Router();

import { validateRequest } from "../middlewares/validateRequest.js";
import { z } from 'zod';

// Esquema de validación para la solicitud GET
const claseSchemeGet = z.object({
    asignatura: z.string().length(36)
});

// Esquema de validación para la solicitud POST
const claseSchemePost = z.object({
    asignatura: z.string().length(36),
    descripcion: z.string().max(100),
    tipo: z.string().max(20),
    tipo_aula: z.string().max(40),
    profesor: z.string().length(36),
    duracion: z.number().int().positive(),
    importante: z.boolean(),
});

// Esquema de validación para la solicitud PATCH
const claseSchemePatch = z.object({
    descripcion: z.string().max(100).optional(),
    tipo: z.string().max(20).optional(),
    tipo_aula: z.string().max(40).optional(),
    profesor: z.string().length(36).optional(),
    duracion: z.number().int().positive().optional(),
    importante: z.boolean().optional(),
});

// Ruta GET para obtener clases de una asignatura específica
// Precondición: Se debe proporcionar el código de la asignatura en la solicitud.
// Postcondición: Devuelve todas las clases asociadas a la asignatura especificada.
ClaseRouter.get('/', authMiddleware, validateRequest(claseSchemeGet), ClaseController.getClases);

// Ruta GET para obtener los detalles de una clase específica mediante su código
// Precondición: Se debe proporcionar el código de la clase en la URL.
// Postcondición: Devuelve los detalles de la clase especificada por el código.
ClaseRouter.get('/:clase_cod', authMiddleware, ClaseController.getClase);

// Ruta POST para crear una nueva clase
// Precondición: Se debe proporcionar toda la información necesaria (asignatura, descripción, tipo, etc.) en el cuerpo de la solicitud.
// Postcondición: Crea una nueva clase y la asocia a la asignatura especificada.
ClaseRouter.post('/', authMiddleware, validateRequest(claseSchemePost), ClaseController.postClase);

// Ruta PATCH para actualizar los detalles de una clase existente
// Precondición: Se debe proporcionar el código de la clase en la URL y los campos a actualizar en el cuerpo de la solicitud.
// Postcondición: Actualiza la clase especificada con los nuevos datos proporcionados.
ClaseRouter.patch('/:clase_cod', authMiddleware, validateRequest(claseSchemePatch), ClaseController.patchClase);

// Ruta DELETE para eliminar una clase
// Precondición: Se debe proporcionar el código de la clase en la URL.
// Postcondición: Elimina la clase especificada del sistema.
ClaseRouter.delete('/:clase_cod', authMiddleware, ClaseController.deleteClase);
