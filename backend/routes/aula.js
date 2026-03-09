import { Router } from 'express'
import { AulaController } from '../controllers/aula.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

export const AulaRouter = Router()

import { validateRequest } from "../middlewares/validateRequest.js";
import { z } from 'zod';

// Esquema de validación para la solicitud GET
const aulaSchemeGet = z.object({
    plantilla: z.string().length(36)
})

// Esquema de validación para la solicitud POST
const aulaSchemePost = z.object({
    plantilla: z.string().length(36),
    nombre: z.string().min(1).max(15),
    tipo: z.string().min(1).max(40),
})

// Esquema de validación para la solicitud PATCH
const aulaSchemePatch = z.object({
    nombre: z.string().min(1).max(15).optional(),
    tipo: z.string().min(1).max(40).optional(),
})

// Ruta GET para obtener todas las aulas de una plantilla
// Precondición: Se debe estar autenticado y enviar un parámetro de plantilla válido.
// Postcondición: Devuelve una lista de aulas de la plantilla especificada.
AulaRouter.get('/', authMiddleware, AulaController.getAulas);

// Ruta GET para obtener los detalles de una aula específica por su código
// Precondición: Se debe estar autenticado y enviar un código de aula válido.
// Postcondición: Devuelve los detalles de la aula especificada.
AulaRouter.get('/:aula_cod', authMiddleware, AulaController.getAula);

// Ruta POST para crear una nueva aula
// Precondición: Se debe estar autenticado y enviar un cuerpo de solicitud válido con los datos de la nueva aula.
// Postcondición: Crea una nueva aula en la base de datos y devuelve los datos de la aula creada.
AulaRouter.post('/', authMiddleware, validateRequest(aulaSchemePost), AulaController.createAula);

// Ruta PATCH para actualizar los datos de una aula específica
// Precondición: Se debe estar autenticado y enviar un código de aula válido, junto con los datos que se desean actualizar.
// Postcondición: Actualiza los datos de la aula especificada en la base de datos.
AulaRouter.patch('/:aula_cod', authMiddleware, validateRequest(aulaSchemePatch), AulaController.updateAula);

// Ruta DELETE para eliminar una aula
// Precondición: Se debe estar autenticado y enviar un código de aula válido.
// Postcondición: Elimina la aula especificada de la base de datos.
AulaRouter.delete('/:aula_cod', authMiddleware, AulaController.deleteAula);
