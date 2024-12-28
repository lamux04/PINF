/**
 * Middleware para manejar los errores en la aplicación.
 * 
 * Este middleware captura cualquier error que ocurra durante el procesamiento de una solicitud y responde con un mensaje de error genérico.
 * También registra el error en la consola para su depuración.
 * 
 * @param {Object} err - El error capturado durante la ejecución de la solicitud.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función para pasar al siguiente middleware o ruta, aunque no se usa en este caso.
 * @returns {Object} - Respuesta con un mensaje de error genérico y un código de estado 500.
 */
export function errorMiddleware(err, req, res, next) {
    console.error(err);  // Registra el error en la consola para su depuración
    res.status(500).json({ message: 'An internal server error occurred' });  // Responde con un error 500
}
