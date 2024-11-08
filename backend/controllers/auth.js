import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { AuthModel } from '../models/auth.js'

export class AuthController
{
    static async login(req, res)
    {
        const { username, password } = req.body

        // Verificar si existe el usuario
        const { exists, user } = await AuthModel.getByUsername({ username }) // Devuelve un objeto con usuario y password
        if (!exists) return res.status(400).json({ message: 'Usuario no encontrado' })
        
        // Ciframos la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) return res.status(401).json({ message: 'Contraseña incorrecta' })
        
        // Generar un token JWT
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '2h' })
        
        res.json({ token })
    }

    static async register(req, res)
    {
        const { username, password } = req.body

        // Verificamos si existe el usuario
        const { exists } = await AuthModel.getByUsername({ username }) // Devuelve un objeto con usuario y password
        if (exists) return res.status(400).json({ message: 'Usuario ya registrado' })
        
        // Cifrar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10)
        await AuthModel.guardarUsuario({ username, password: hashedPassword })

        // Creamos el token para que el usuario ya este logueado
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '2h' })

        res.status(201).json({ message: 'Usuario registrado con exito ', token})
    }

    static async delete(req, res)
    {
        const { username } = req.user        // Capturamos el parametro del token

        // Verificamos que existe el usuario
        const { exists } = await AuthModel.getByUsername({ username }) // Devuelve un objeto con usuario y password
        if (!exists) return res.status(400).json({ message: 'Usuario no encontrado' })
        
        await AuthModel.deleteByUsername({ username })

        res.json({ message: 'Usuario eliminado correctamente '})
    }
}
