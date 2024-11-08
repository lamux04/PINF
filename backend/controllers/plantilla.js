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

    // Funcion de /api/plantilla/:plant_cod
    static async getByCodigo(req, res)
    {
        // Obtenemos el nombre de usuario del token
        const { username } = req.user

        // Comprobamos que el usuario es valido
        const { exists } = await AuthModel.getByUsername({ username })            // Devuelve un objeto con usuario y password
        if (!exists) return res.status(400).json({ message: 'Usuario no encontrado' })

        // Obtenemos el codigo de la plantilla
        const { plant_cod } = req.params

        // Extraemos las plantilla con el modelo
        const { plantilla, exists: existsp } = await PlantillaModel.getByCodigo({ plant_cod })
        if (!existsp) return res.status(400).json({ message: 'Plantilla no encontrada' })

        res.json(plantilla)
    }

    // Funcion de POST /api/plantilla
    static async create(req, res)
    {
        // Obtenemos el nombre de usuario del token
        const { username } = req.user

        // Comprobamos que el usuario es valido
        const { exists } = await AuthModel.getByUsername({ username })            // Devuelve un objeto con usuario y password
        if (!exists) return res.status(400).json({ message: 'Usuario no encontrado' })

        // Obtenemos el nombre de la plantilla
        const { nombre } = req.body
        if (!nombre) return res.status(400).json({ message: 'Falta el nombre de la plantilla' })

        // Creamos la plantilla con el modelo
        const { plant_cod } = await PlantillaModel.create({ nombre, username })

        res.json({ codigo: plant_cod, nombre })
    }

    // Funcion de PATCH /api/plantilla/:plant_cod
    static async update(req, res)
    {
        // Obtenemos el nombre de usuario del token
        const { username } = req.user

        // Comprobamos que el usuario es valido
        const { exists } = await AuthModel.getByUsername({ username })            // Devuelve un objeto con usuario y password
        if (!exists) return res.status(400).json({ message: 'Usuario no encontrado' })

        // Obtenemos el codigo de la plantilla
        const { plant_cod } = req.params

        // Obtenemos el nombre de la plantilla
        const { nombre } = req.body
        if (!nombre)
        {
            // Obtenemos el nombre actual
            const { plantilla, exists: existsp } = await PlantillaModel.getSoloPlantillaByCodigo({ plant_cod })
            if (!existsp) return res.status(400).json({ message: 'Plantilla no encontrada' })
            return res.json(plantilla)
        }

        // Actualizamos la plantilla con el modelo
        const { exists: existsp } = await PlantillaModel.update({ plant_cod, nombre })
        if (!existsp) return res.status(400).json({ message: 'Plantilla no encontrada' })

        res.json({ codigo: plant_cod, nombre })
    }

    // Funcion de DELETE /api/plantilla/:plant_cod
    static async delete(req, res)
    {
        // Obtenemos el nombre de usuario del token
        const { username } = req.user

        // Comprobamos que el usuario es valido
        const { exists } = await AuthModel.getByUsername({ username })            // Devuelve un objeto con usuario y password
        if (!exists) return res.status(400).json({ message: 'Usuario no encontrado' })

        // Obtenemos el codigo de la plantilla
        const { plant_cod } = req.params

        // Eliminamos la plantilla con el modelo
        const { exists: existsp } = await PlantillaModel.delete({ plant_cod })
        if (!existsp) return res.status(400).json({ message: 'Plantilla no encontrada' })

        res.json({ message: 'Plantilla eliminada' })
    }
}