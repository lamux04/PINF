import { Router } from "express";
export const PlantillaRouter = Router();
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { PlantillaController } from "../controllers/plantilla.js";

import { validateRequest } from "../middlewares/validateRequest.js";
import { z } from 'zod';

// Esquema de validación para la solicitud POST de crear una plantilla
const plantillaSchemePost = z.object({
    nombre: z.string().max(30)
});

// Esquema de validación para la solicitud PATCH de actualizar una plantilla
const plantillaSchemePatch = z.object({
    nombre: z.string().max(30).optional()
});

// Ruta GET para obtener todas las plantillas
// Precondición: Ninguna.
// Postcondición: Devuelve una lista con todas las plantillas.
PlantillaRouter.get('/', authMiddleware, PlantillaController.getAll);

// Ruta GET para obtener una lista específica de plantillas
// Precondición: Ninguna.
// Postcondición: Devuelve una lista con las plantillas según el criterio de búsqueda.
PlantillaRouter.get('/lista_plantillas', authMiddleware, PlantillaController.getLista);

// Ruta GET para verificar si una plantilla existe
// Precondición: Se debe proporcionar el código de la plantilla en la URL.
// Postcondición: Devuelve una respuesta que indica si la plantilla existe o no.
PlantillaRouter.get('/verificar/:plant_cod', authMiddleware, PlantillaController.verificar);

// Ruta GET para obtener los detalles de una plantilla específica
// Precondición: Se debe proporcionar el código de la plantilla en la URL.
// Postcondición: Devuelve los detalles de la plantilla especificada por su código.
PlantillaRouter.get('/ver_plantilla/:plant_cod', authMiddleware, PlantillaController.verPlantilla);

// Ruta GET para obtener una plantilla específica mediante su código
// Precondición: Se debe proporcionar el código de la plantilla en la URL.
// Postcondición: Devuelve la plantilla especificada por su código.
PlantillaRouter.get('/:plant_cod', authMiddleware, PlantillaController.getByCodigo);

// Ruta POST para crear una nueva plantilla
// Precondición: Se debe proporcionar el nombre de la plantilla en el cuerpo de la solicitud.
// Postcondición: Crea una nueva plantilla con el nombre proporcionado.
PlantillaRouter.post('/', authMiddleware, validateRequest(plantillaSchemePost), PlantillaController.create);

// Ruta PATCH para actualizar los datos de una plantilla existente
// Precondición: Se debe proporcionar el código de la plantilla en la URL y los datos a actualizar en el cuerpo de la solicitud.
// Postcondición: Actualiza la plantilla especificada por su código.
PlantillaRouter.patch('/:plant_cod', authMiddleware, validateRequest(plantillaSchemePatch), PlantillaController.update);

// Ruta DELETE para eliminar una plantilla específica
// Precondición: Se debe proporcionar el código de la plantilla en la URL.
// Postcondición: Elimina la plantilla especificada por su código.
PlantillaRouter.delete('/:plant_cod', authMiddleware, PlantillaController.delete);
