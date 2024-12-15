import { HorarioModel } from '../models/horario.js'
import { AuthModel } from '../models/auth.js'
import { PlantillaModel } from '../models/plantilla.js'
import { json } from 'express'

const endpoint = `${process.env.API_HOST}/sched4allAPI/`

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
        const { valido: valido1 } = await HorarioModel.puedeVer({ horar_cod, username })
        const { valido: valido2 } = await HorarioModel.perteneceAUsuario({ horar_cod, username })
        if (!valido1 && !valido2) return res.status(401).json({ message: 'No autorizado' })

        // Extraemos el horario con el modelo
        const { horario, exists: existsh } = await HorarioModel.getByCodigo({ horar_cod })
        if (!existsh) return res.status(400).json({ message: 'Horario no encontrado' })

        res.json(horario)
    }

    // POST /horario { plantilla, nombre, h_ini, h_fin, inicio_desc, fin_desc }
    static async create(req, res)
    {
        // Obtenemos el nombre de usuario del token
        const { username } = req.user

        // Obtenemos el codigo de la plantilla a usar
        const { plantilla: plant_cod, nombre, h_ini, h_fin, inicio_desc, fin_desc } = req.body

        // Comprobamos que la plantilla es valida
        const { valida } = await PlantillaModel.perteneceAUsuario({ plant_cod, username })
        if (!valida) return res.status(400).json({ message: 'Plantilla no encontrada' })
        
        // Creamos el horario
        const { horar_cod } = await HorarioModel.create({ plant_cod, nombre })

        // ----------- Generamos el horario con la API ------------
        // Obtenemos los datos necesarios
        const { datos } = await HorarioModel.getDatos({ plant_cod })

        datos['h_ini'] = h_ini
        datos['h_fin'] = h_fin
        datos['inicio_desc'] = inicio_desc
        datos['fin_desc'] = fin_desc

        // Creamos el horario con la API
        const response = await fetch(`${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })

        // Guardamos los datos en la base de datos
        const data = await response.json()
        await HorarioModel.saveData({ horar_cod, data })

        // Agregamos al usuario como visualizador
        await HorarioModel.addVisualizador({ horar_cod, username })

        return res.json({ horar_cod })
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

        // Comprobamos que exista el horario
        const { exists } = await HorarioModel.existe({ horar_cod })
        if (!exists) return res.status(400).json({ message: 'Horario no encontrado' })

        // Eliminamos al usuario como visualizador
        await HorarioModel.deleteVisualizador({ horar_cod, username })

        res.json({ message: 'Visualizacion eliminada correctamente' })
    }

    // GET /horario/horarios_generados/:horar_cod
    static async getHorariosGenerados(req, res)
    {
        // Obtenemos el nombre de usuario del token
        const { username } = req.user
        const { plant_cod } = req.params

        // Comprobamos que la plantilla sea del usuario
        const { valida } = await PlantillaModel.perteneceAUsuario({ plant_cod, username })
        if (!valida) return res.status(400).json({ message: 'Plantilla no encontrada' })

        // Extraemos los horarios generados
        const { horarios } = await HorarioModel.getHorariosGenerados({ plant_cod })

        res.json({ horarios })
    }

    // GET /horario/verificar/:horar_cod
    static async verificar(req, res)
    {
        // Obtenemos el nombre de usuario del token
        const { username } = req.user
        const { horar_cod } = req.params

        // Comprobamos que el horario sea del usuario
        const { valido } = await HorarioModel.puedeVer({ horar_cod, username })
        const { valido: valido2 } = await HorarioModel.perteneceAUsuario({ horar_cod, username })
        if (!valido && !valido2) return res.status(400).json({ message: 'El usuario no puede ver el horario' })

        res.json({ username, horar_cod })
    }
}