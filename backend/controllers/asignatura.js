import { AsignaturaModel } from '../models/asignatura.js'
import { CursoModel } from '../models/curso.js'
import { PlantillaModel } from '../models/plantilla.js'

export class AsignaturaController
{
    // GET /api/asignatura  { curso }
    static async getAsignaturas(req, res)
    {
        // Obtenemos los parametros
        const { curso: curso_cod } = req.body
        const { username } = req.user

        // Validamos los atributos
        if (!curso_cod) return res.status(400).json({ message: 'Curso es requerido' })

        // Comprobamos que el curso sea del usuario
        const { valida } = await CursoModel.perteneceAUsuario({ curso_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })

        // Obtenemos las asignaturas
        const { asignaturas } = await AsignaturaModel.getByCurso({ curso_cod })

        res.json({ asignaturas })
    }

    // GET /api/asignatura/:asig_cod
    static async getAsignatura(req, res)
    {
        // Obtenemos los parametros
        const { asig_cod } = req.params
        const { username } = req.user

        // Comprobamos que la asignatura sea del usuario
        const { valida } = await AsignaturaModel.perteneceAUsuario({ asig_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })

        // Obtenemos la asignatura
        const { asignatura } = await AsignaturaModel.getByCodigo({ asig_cod })

        res.json(asignatura)
    }

    // POST /api/asignatura
    static async postAsignatura(req, res)
    {
        // Obtenemos los parametros
        const { nombre, aprobabilidad } = req.body
        const { username } = req.user
        const { curso: curso_cod } = req.body

        // Validamos los atributos
        if (!nombre) return res.status(400).json({ message: 'Nombre es requerido' })
        if (aprobabilidad === undefined) return res.status(400).json({ message: 'Aprobabilidad es requerida' })

        // Comprobamos que el curso sea del usuario
        const { valida, plant_cod } = await CursoModel.perteneceAUsuario({ curso_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })

        // Insertamos la asignatura
        const { asig_cod } = await AsignaturaModel.create({ asig_nombre: nombre, asig_aprobabilidad: aprobabilidad, curso_cod })
        
        // Eliminamos todos los horarios de la plantilla
        await PlantillaModel.deleteHorarios({ plant_cod })

        res.json({ codigo: asig_cod, nombre, aprobabilidad })
    }

    // PATCH /api/asignatura/:asig_cod
    static async patchAsignatura(req, res)
    {
        // Obtenemos los parametros
        const { asig_cod } = req.params
        const { nombre, aprobabilidad } = req.body
        const { username } = req.user

        // Comprobamos que la asignatura sea del usuario
        const { valida } = await AsignaturaModel.perteneceAUsuario({ asig_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })

        // Obtenemos solo la asignatura
        const { asig_nombre: nombreActual, asig_aprobabilidad: aprobabilidadActual } = await AsignaturaModel.getSoloAsignatura({ asig_cod })

        // Actualizamos la asignatura
        await AsignaturaModel.update({ asig_cod, asig_nombre: nombre ?? nombreActual, asig_aprobabilidad: aprobabilidad ?? aprobabilidadActual })

        res.json({ codigo: asig_cod, nombre: nombre ?? nombreActual, aprobabilidad: aprobabilidad ?? aprobabilidadActual })
    }

    // DELETE /api/asignatura/:asig_cod
    static async deleteAsignatura(req, res)
    {
        // Obtenemos los parametros
        const { asig_cod } = req.params
        const { username } = req.user

        // Comprobamos que la asignatura sea del usuario
        const { valida, plant_cod } = await AsignaturaModel.perteneceAUsuario({ asig_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })

        // Eliminamos la asignatura
        await AsignaturaModel.delete({ asig_cod })

        // Eliminamos todos los horarios de la plantilla
        await PlantillaModel.deleteHorarios({ plant_cod })

        res.json({ message: 'Asignatura eliminada' })
    }
}