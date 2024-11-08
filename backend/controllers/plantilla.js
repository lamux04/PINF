import { AuthModel } from "../models/auth.js"
import { PlantillaModel } from "../models/plantilla.js"

export class PlantillaController
{
    // Funcion de /api/plantilla
    static async getAll(req, res)
    {
        // Obtenemos el nombre de usuario del token
        const { username } = req.user

        // Comprobamos que el usuario es valido
        const { exists } = await AuthModel.getByUsername({ username })            // Devuelve un objeto con usuario y password
        if (!exists) return res.status(400).json({ message: 'Usuario no encontrado' })
        
        // Extraemos las plantillas con el modelo
        const { plantillas } = await PlantillaModel.getByUsername({ username })

        res.json({ plantillas })
    }
}