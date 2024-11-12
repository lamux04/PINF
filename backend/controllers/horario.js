import { HorarioModel } from '../models/horario.js'
import { AuthModel } from '../models/auth.js'
import { PlantillaModel } from '../models/plantilla.js'

export class HorarioController
{
    // GET /horario
    static async getAll(req, res)
    {
        // Obtenemso el nombre de usuario del token
        const { username } = req.user

        // Comprobamos que el usuario es valido
        const { exists } = await AuthModel.getByUsername({ username })            // Devuelve un objeto con usuario y password
        if (!exists) return res.status(400).json({ message: 'Usuario no encontrado' })
        
        // Extraemos los horarios con el modelo
        const { horarios } = await HorarioModel.getHorariosQueVeUsuario({ username })

        res.json({ horarios })
    }

    // GET /horario/:hor_cod
    static async getByCodigo(req, res)
    {
        // Obtenemos el nombre de usuario del token
        const { username } = req.user

        // Comprobamos que el usuario es valido
        const { exists } = await AuthModel.getByUsername({ username })            // Devuelve un objeto con usuario y password
        if (!exists) return res.status(400).json({ message: 'Usuario no encontrado' })

        // Obtenemos el codigo del horario
        const { hor_cod } = req.params

        // Comprobamos q el usuario puede ver el horario
        const { valido } = await HorarioModel.puedeVer({ hor_cod, username })
        if (!valido) return res.status(400).json({ message: 'Horario no visible para el usuario' })

        // Extraemos el horario con el modelo
        const { horario, exists: existsh } = await HorarioModel.getByCodigo({ hor_cod })
        if (!existsh) return res.status(400).json({ message: 'Horario no encontrado' })

        res.json(horario)
    }

    // POST /horario
    static async create(req, res)
    {
        // Obtenemos el nombre de usuario del token
        const { username } = req.user

        // Comprobamos que el usuario es valido
        const { exists } = await AuthModel.getByUsername({ username })            // Devuelve un objeto con usuario y password
        if (!exists) return res.status(400).json({ message: 'Usuario no encontrado' })

        // Obtenemos el codigo de la plantilla a usar
        const { plant_cod } = req.body

        // Comprobamos que la plantilla es valida
        const { valida } = await PlantillaModel.perteneceAUsuario({ plant_cod, username })
        if (!valida) return res.status(400).json({ message: 'Plantilla no encontrada' })
        
        // Creamos el horario usando la API de javi
        // todo: crear horario

        return res.json({ coidgo_horario: 1 })
    }

    // DELETE /horario/:hor_cod
    static async delete(req, res)
    {
        // Obtenemos el nombre de usuario del token
        const { username } = req.user

        // Comprobamos que el usuario es valido
        const { exists } = await AuthModel.getByUsername({ username })            // Devuelve un objeto con usuario y password
        if (!exists) return res.status(400).json({ message: 'Usuario no encontrado' })

        // Obtenemos el codigo del horario
        const { horar_cod } = req.params

        // Comprobamos que el horario es valido
        const { valido } = await HorarioModel.perteneceAUsuario({ horar_cod, username })
        if (!valido) return res.status(400).json({ message: 'Horario no encontrado' })

        // Borramos el horario
        await HorarioModel.delete({ horar_cod })

        res.json({ message: 'Horario eliminado correctamente' })
    }
}