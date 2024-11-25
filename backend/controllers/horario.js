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
        
        // Extraemos los horarios con el modelo
        const { horarios } = await HorarioModel.getHorariosQueVeUsuario({ username })

        res.json({ horarios })
    }

    // GET /horario/:horar_cod
    static async getByCodigo(req, res)
    {
        // Obtenemos el nombre de usuario del token
        const { username } = req.user
        const { horar_cod } = req.params

        // Comprobamos que el usuario es valido
        const { valido: puedeVer } = await HorarioModel.puedeVer({ horar_cod, username })
        if (!puedeVer) return res.status(401).json({ message: 'No autorizado' })

        // Extraemos el horario con el modelo
        const { horario, exists: existsh } = await HorarioModel.getByCodigo({ horar_cod })
        if (!existsh) return res.status(400).json({ message: 'Horario no encontrado' })

        res.json(horario)
    }

    // POST /horario { plantilla }
    static async create(req, res)
    {
        // Obtenemos el nombre de usuario del token
        const { username } = req.user

        // Obtenemos el codigo de la plantilla a usar
        const { plantilla: plant_cod } = req.body

        // Comprobamos que la plantilla es valida
        const { valida } = await PlantillaModel.perteneceAUsuario({ plant_cod, username })
        if (!valida) return res.status(400).json({ message: 'Plantilla no encontrada' })
        
        // Obtenemos la inforamcion de la plantilla
        // Creamos el horario usando la API de javi
        // todo: crear horario

        const horar_cod = '1234'

        // Agregamos al usuario como visualizador
        await HorarioModel.addVisualizador({ horar_cod, username })

        return res.json({ horar_cod})
    }

    // DELETE /horario/:horar_cod
    static async delete(req, res)
    {
        // Obtenemos el nombre de usuario del token
        const { username } = req.user

        // Obtenemos el codigo del horario
        const { horar_cod } = req.params

        // Comprobamos que el horario es valido
        const { valido } = await HorarioModel.perteneceAUsuario({ horar_cod, username })
        if (!valido) return res.status(400).json({ message: 'Horario no encontrado' })

        // Borramos el horario
        await HorarioModel.deleteByCodigo({ horar_cod })

        res.json({ message: 'Horario eliminado correctamente' })
    }

    // POST /horario/visualizar  { horario }
    static async visualizar(req, res)
    {
        // Obtenemos los atributos
        const { horario: horar_cod } = req.body
        const { username } = req.user

        // Comprobamos que exista el horario
        const { exists } = await HorarioModel.existe({ horar_cod })
        if (!exists) return res.status(400).json({ message: 'Horario no encontrado' })
        
        // Comprobamos que el usuario no pueda ver el horario
        const { valido } = await HorarioModel.puedeVer({ horar_cod, username })
        if (valido) return res.status(400).json({ message: 'Ya puedes ver el horario' })
        
        // Agregamos el usuario como visualizador
        await HorarioModel.addVisualizador({ horar_cod, username })

        // Obtenemos el nombre del horario
        const { nombre } = await HorarioModel.getNombre({ horar_cod })

        res.json({ message: 'Usuario añadido correctamente', codigo: horar_cod, nombre })
    }

    // DELETE /horario/visualizar  { horario }
    static async noVisualizar(req, res)
    {
        // Obtenemos los atributos
        const { horario: horar_cod } = req.body
        const { username } = req.user

        console.log("Horario -> ", horar_cod)

        // Comprobamos que exista el horario
        const { exists } = await HorarioModel.existe({ horar_cod })
        if (!exists) return res.status(400).json({ message: 'Horario no encontrado' })

        // Eliminamos al usuario como visualizador
        await HorarioModel.deleteVisualizador({ horar_cod, username })

        res.json({ message: 'Visualizacion eliminada correctamente' })
    }
}