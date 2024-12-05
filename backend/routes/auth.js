import { Router } from "express"
import { AuthController } from '../controllers/auth.js'
export const AuthRouter = Router();
import { authMiddleware } from "../middlewares/authMiddleware.js"; 
import { validateRequest } from "../middlewares/validateRequest.js";
import { z } from 'zod';

const registerSchema = z.object({
    username: z.string().max(30),
    password: z.string().max(60),
});

AuthRouter.get('/verify', authMiddleware, AuthController.verify)
AuthRouter.post('/register', validateRequest(registerSchema) ,AuthController.register)
AuthRouter.post('/login', validateRequest(registerSchema), AuthController.login)
AuthRouter.post('/logout', AuthController.logout)
AuthRouter.delete('/delete', authMiddleware, AuthController.delete)