import { Router } from "express"
import { AuthController } from '../controllers/auth.js'
export const AuthRouter = Router();
import { authMiddleware } from "../middlewares/authMiddleware.js"; 
import { validateRequest } from "../middlewares/validateRequest.js";
import { z } from 'zod';

const registerSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(8),
});

AuthRouter.post('/register', validateRequest(registerSchema) ,AuthController.register)
AuthRouter.post('/login', AuthController.login)
AuthRouter.delete('/delete', authMiddleware, AuthController.delete)