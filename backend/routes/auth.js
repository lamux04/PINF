import { Router } from "express"
import { AuthController } from '../controllers/auth.js'
export const AuthRouter = Router();
import { authMiddleware } from "../middlewares/authMiddleware.js"; 
import { validateRequest } from "../middlewares/validateRequest.js";
import { z } from 'zod';

// Esquema de validación para las solicitudes de registro y login
const registerSchema = z.object({
    username: z.string().max(30),
    password: z.string().max(60),
})

// Ruta GET para verificar si el usuario está autenticado
// Precondición: Se debe estar autenticado.
// Postcondición: Devuelve un estado que indica si el usuario está autenticado.
AuthRouter.get('/verify', authMiddleware, AuthController.verify);

// Ruta POST para registrar un nuevo usuario
// Precondición: Se debe enviar un cuerpo de solicitud válido con el nombre de usuario y la contraseña.
// Postcondición: Crea una nueva cuenta de usuario y devuelve los datos necesarios para la autenticación.
AuthRouter.post('/register', validateRequest(registerSchema), AuthController.register);

// Ruta POST para iniciar sesión en el sistema
// Precondición: Se debe enviar un cuerpo de solicitud válido con el nombre de usuario y la contraseña.
// Postcondición: Inicia sesión con las credenciales proporcionadas y devuelve un token de autenticación.
AuthRouter.post('/login', validateRequest(registerSchema), AuthController.login);

// Ruta POST para cerrar sesión
// Precondición: El usuario debe estar autenticado.
// Postcondición: Cierra la sesión del usuario y elimina su token de autenticación.
AuthRouter.post('/logout', AuthController.logout);

// Ruta DELETE para eliminar un usuario
// Precondición: El usuario debe estar autenticado.
// Postcondición: Elimina la cuenta del usuario del sistema.
AuthRouter.delete('/delete', authMiddleware, AuthController.delete);
