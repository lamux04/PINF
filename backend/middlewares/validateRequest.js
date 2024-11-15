import { z } from 'zod';

export const validateRequest = (schema) => (req, res, next) => {
  const validation = schema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: 'Error de validación',
      errors: validation.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      })),
    });
  }

  // Si la validación es exitosa, añadimos los datos validados a `req.validatedData`
  req.validatedData = validation.data;
  next();
};