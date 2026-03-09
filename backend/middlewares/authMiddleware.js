import jwt from 'jsonwebtoken';

/**
 * Middleware para la autenticación de usuarios mediante token JWT.
 * 
 * Verifica la validez del token JWT en la solicitud y, si es válido, agrega la información del usuario decodificada al objeto `req.user`.
 * En caso de que el token no sea proporcionado o sea inválido, responde con un mensaje de error.
 * 
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función para pasar al siguiente middleware o ruta.
 * @returns {Object} - Respuesta con error si el token es inválido o no proporcionado.
 */
export function authMiddleware(req, res, next) {
    const token = req.cookies.authToken;  // El token está en las cookies bajo el nombre 'authToken'

    // Verificación de la existencia del token
    if (!token) return res.status(403).json({ message: 'Token no provisto', token: false });

    try {
        // Verificación y decodificación del token utilizando la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Almacenamos la información del usuario decodificada en `req.user`
        next();  // Llamamos al siguiente middleware o ruta
    } catch (error) {
        // Si el token es inválido, respondemos con un mensaje de error
        return res.status(401).json({ message: 'Token inválido', token: false });
    }
}
