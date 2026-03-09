/**
 * Controlador para la autenticación y gestión de sesiones de usuarios.
 * Proporciona métodos para inicio de sesión, registro, eliminación de cuentas, verificación de sesión y cierre de sesión.
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthModel } from '../models/auth.js';

export class AuthController {
    /**
     * Maneja el inicio de sesión de usuarios.
     * Valida las credenciales, genera un token JWT y establece una cookie de autenticación.
     * @param {Object} req - El objeto de solicitud HTTP que contiene el nombre de usuario y contraseña.
     * @param {Object} res - El objeto de respuesta HTTP.
     */
    static async login(req, res) {
        const { username, password } = req.body;

        // Verificar si el usuario existe
        const { exists, user } = await AuthModel.getByUsername({ username }); // Devuelve un objeto con usuario y contraseña
        if (!exists) return res.status(400).json({ message: 'Usuario no encontrado' });

        // Validar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

        // Generar un token JWT
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.cookie('authToken', token, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 2 * 60 * 60 * 1000
        });

        res.json({ token });
    }

    /**
     * Maneja el registro de usuarios.
     * Cifra la contraseña, guarda el usuario y genera un token JWT para iniciar sesión automáticamente.
     * @param {Object} req - El objeto de solicitud HTTP que contiene el nombre de usuario y contraseña.
     * @param {Object} res - El objeto de respuesta HTTP.
     */
    static async register(req, res) {
        const { username, password } = req.body;

        // Verificar si el usuario ya existe
        const { exists } = await AuthModel.getByUsername({ username });
        if (exists) return res.status(400).json({ message: 'Usuario ya registrado' });

        // Cifrar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);
        await AuthModel.guardarUsuario({ username, password: hashedPassword });

        // Generar un token JWT para iniciar sesión automáticamente
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.cookie('authToken', token, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 2 * 60 * 60 * 1000
        });

        res.status(201).json({ message: 'Usuario registrado con exito ', token });
    }

    /**
     * Maneja la eliminación de cuentas de usuarios.
     * Elimina al usuario de la base de datos.
     * @param {Object} req - El objeto de solicitud HTTP que contiene el usuario autenticado.
     * @param {Object} res - El objeto de respuesta HTTP.
     */
    static async delete(req, res) {
        const { username } = req.user; // Extraer el nombre de usuario del token

        // Verificar si el usuario existe
        const { exists } = await AuthModel.getByUsername({ username });
        if (!exists) return res.status(400).json({ message: 'Usuario no encontrado' });

        // Eliminar al usuario
        await AuthModel.deleteByUsername({ username });

        res.json({ message: 'Usuario eliminado correctamente ' });
    }

    /**
     * Verifica la sesión del usuario autenticado.
     * Comprueba si el usuario existe en la base de datos.
     * @param {Object} req - El objeto de solicitud HTTP que contiene el usuario autenticado.
     * @param {Object} res - El objeto de respuesta HTTP.
     */
    static async verify(req, res) {
        const { username } = req.user; // Extraer el nombre de usuario del token

        // Verificar si el usuario existe
        const { exists } = await AuthModel.getByUsername({ username });
        if (!exists) return res.status(400).json({ message: 'Usuario no encontrado', token: false });

        res.json({ message: 'Usuario verificado', token: true, username });
    }

    /**
     * Cierra la sesión del usuario eliminando la cookie de autenticación.
     * @param {Object} req - El objeto de solicitud HTTP.
     * @param {Object} res - El objeto de respuesta HTTP.
     */
    static async logout(req, res) {
        res.clearCookie('authToken', {
            httpOnly: true,
            sameSite: 'Strict',
        });
        res.json({ message: 'Sesion cerrada correctamente' });
    }
}