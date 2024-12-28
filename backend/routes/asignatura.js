import { Router } from 'express';
import { AsignaturaController } from '../controllers/asignatura.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

export const AsignaturaRouter = Router();

import { validateRequest } from "../middlewares/validateRequest.js";
import { z } from 'zod';

// Esquema de validación para la solicitud GET
const asignaturaSchemeGet = z.object({
    curso: z.string().length(36)
})

// Esquema de validación para la solicitud POST
const asignaturaSchemePost = z.object({
    curso: z.string().length(36),
    nombre: z.string().max(60),
    aprobabilidad: z.number().int().min(0).max(1)
})

// Esquema de validación para la solicitud PATCH
const asignaturaSchemePatch = z.object({
    nombre: z.string().max(60).optional(),
    aprobabilidad: z.number().int().min(0).max(1).optional()
})

// Ruta GET para obtener todas las asignaturas de un curso
// Precondición: Se debe estar autenticado y enviar un parámetro de curso válido.
// Postcondición: Devuelve una lista de asignaturas del curso especificado.
AsignaturaRouter.get('/', authMiddleware, validateRequest(asignaturaSchemeGet), AsignaturaController.getAsignaturas);

// Ruta GET para obtener una asignatura específica por su código
// Precondición: Se debe estar autenticado y enviar un código de asignatura válido.
// Postcondición: Devuelve los datos de la asignatura especificada.
AsignaturaRouter.get('/:asig_cod', authMiddleware, AsignaturaController.getAsignatura);

// Ruta POST para crear una nueva asignatura en un curso
// Precondición: Se debe estar autenticado y enviar un cuerpo de solicitud válido con los datos de la asignatura.
// Postcondición: Crea una nueva asignatura en la base de datos y devuelve los datos de la asignatura creada.
AsignaturaRouter.post('/', authMiddleware, validateRequest(asignaturaSchemePost), AsignaturaController.postAsignatura);

// Ruta PATCH para actualizar los datos de una asignatura
// Precondición: Se debe estar autenticado y enviar un código de asignatura válido, junto con los datos que se desean actualizar.
// Postcondición: Actualiza los datos de la asignatura especificada.
AsignaturaRouter.patch('/:asig_cod', authMiddleware, validateRequest(asignaturaSchemePatch), AsignaturaController.patchAsignatura);

// Ruta DELETE para eliminar una asignatura
// Precondición: Se debe estar autenticado y enviar un código de asignatura válido.
// Postcondición: Elimina la asignatura especificada de la base de datos.
AsignaturaRouter.delete('/:asig_cod', authMiddleware, AsignaturaController.deleteAsignatura);
