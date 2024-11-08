import { Router } from "express";
import { AuthController } from '../controllers/auth.js'
export const AuthRouter = Router();
import { authMiddleware } from "../middlewares/authMiddleware.js";

AuthRouter.post('/register', AuthController.register)
AuthRouter.post('/login', AuthController.login)
AuthRouter.delete('/delete', authMiddleware, AuthController.delete)