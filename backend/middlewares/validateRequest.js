import { z } from 'zod';

/**
 * Middleware para validar los datos de la solicitud utilizando un esquema de validación de Zod.
 * 
 * Este middleware recibe un esquema de validación y valida los datos del cuerpo de la solicitud (`req.body`) contra ese esquema.
 * Si la validación falla, responde con un mensaje de error detallado indicando los campos con errores.
 * Si la validación es exitosa, los datos validados se agregan a `req.validatedData` para su uso posterior en los siguientes middlewares o rutas.
 * 
 * @param {Object} schema - Esquema de validación de Zod.
 * @returns {Function} - Middleware para validar los datos de la solicitud.
 * @throws {Object} - Respuesta con código de estado 400 y detalles de los errores de validación si la validación falla.
 */
export const validateRequest = (schema) => (req, res, next) => {
  const validation = schema.safeParse(req.body);  // Validación de los datos de la solicitud

  // Si la validación falla, respondemos con los errores
  if (!validation.success) {
    return res.status(400).json({
      message: 'Error de validación',
      errors: validation.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      })),
    });
  }

  // Si la validación es exitosa, se almacenan los datos validados en `req.validatedData`
  req.validatedData = validation.data;
  next();  // Pasamos al siguiente middleware o ruta
};
