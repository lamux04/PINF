import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { CursoController } from "../controllers/curso.js";

export const CursoRouter = Router();

import { validateRequest } from "../middlewares/validateRequest.js";
import { z } from 'zod';

// Esquema de validación para la solicitud GET
const cursoSchemeGet = z.object({
    carrera: z.string().length(36)
});

// Esquema de validación para la solicitud POST
const cursoSchemePost = z.object({
    carrera: z.string().length(36),
    nombre: z.string().max(30)
});

// Esquema de validación para la solicitud PATCH
const cursoSchemePatch = z.object({
    nombre: z.string().max(30).optional()
});

// Ruta GET para obtener todos los cursos asociados a una carrera
// Precondición: Se debe proporcionar el código de la carrera en la solicitud.
// Postcondición: Devuelve todos los cursos asociados a la carrera especificada.
CursoRouter.get('/', authMiddleware, validateRequest(cursoSchemeGet), CursoController.getAll);

// Ruta GET para obtener la plantilla de un curso específico mediante su código
// Precondición: Se debe proporcionar el código del curso en la URL.
// Postcondición: Devuelve la plantilla asociada al curso especificado.
CursoRouter.get('/ver_plantilla/:curso_cod', authMiddleware, CursoController.getCodigoPlantilla);

// Ruta GET para consultar los cursos relacionados con un código específico
// Precondición: Se debe proporcionar el código del curso en la URL.
// Postcondición: Devuelve todos los cursos asociados al código del curso especificado.
CursoRouter.get('/consultar_cursos/:curso_cod', authMiddleware, CursoController.getCursosByCodigo);

// Ruta GET para verificar si un curso existe
// Precondición: Se debe proporcionar el código del curso en la URL.
// Postcondición: Devuelve un mensaje de verificación del curso especificado.
CursoRouter.get('/verificar/:curso_cod', authMiddleware, CursoController.verifyCurso);

// Ruta GET para ver los detalles de un curso específico mediante su código
// Precondición: Se debe proporcionar el código del curso en la URL.
// Postcondición: Devuelve los detalles del curso especificado por su código.
CursoRouter.get('/ver_curso/:curso_cod', authMiddleware, CursoController.verCurso);

// Ruta GET para obtener un curso específico mediante su código
// Precondición: Se debe proporcionar el código del curso en la URL.
// Postcondición: Devuelve el curso especificado por el código.
CursoRouter.get('/:curso_cod', authMiddleware, CursoController.getByCodigo);

// Ruta POST para crear un nuevo curso
// Precondición: Se debe proporcionar la carrera y el nombre del curso en el cuerpo de la solicitud.
// Postcondición: Crea un nuevo curso asociado a la carrera especificada.
CursoRouter.post('/', authMiddleware, validateRequest(cursoSchemePost), CursoController.create);

// Ruta PATCH para actualizar los detalles de un curso existente
// Precondición: Se debe proporcionar el código del curso en la URL y los campos a actualizar en el cuerpo de la solicitud.
// Postcondición: Actualiza el curso especificado con los nuevos datos proporcionados.
CursoRouter.patch('/:curso_cod', authMiddleware, validateRequest(cursoSchemePatch), CursoController.update);

// Ruta DELETE para eliminar un curso específico
// Precondición: Se debe proporcionar el código del curso en la URL.
// Postcondición: Elimina el curso especificado del sistema.
CursoRouter.delete('/:curso_cod', authMiddleware, CursoController.delete);
