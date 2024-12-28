// Importación de los modelos necesarios para manejar la lógica de negocio
import { AsignaturaModel } from '../models/asignatura.js'
import { CursoModel } from '../models/curso.js'
import { PlantillaModel } from '../models/plantilla.js'

// Definición del controlador para gestionar asignaturas
export class AsignaturaController
{
    /**
     * Obtiene todas las asignaturas de un curso específico.
     * Endpoint: GET /api/asignatura
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     */
    static async getAsignaturas(req, res)
    {
        // Extraemos el código del curso y el usuario autenticado
        const { curso: curso_cod } = req.body
        const { username } = req.user

        // Validación de entrada: se requiere el código del curso
        if (!curso_cod) return res.status(400).json({ message: 'Curso es requerido' })

        // Verificación de que el curso pertenece al usuario autenticado
        const { valida } = await CursoModel.perteneceAUsuario({ curso_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })

        // Obtención de las asignaturas asociadas al curso
        const { asignaturas } = await AsignaturaModel.getByCurso({ curso_cod })

        res.json({ asignaturas })
    }

    /**
     * Obtiene los detalles de una asignatura específica.
     * Endpoint: GET /api/asignatura/:asig_cod
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     */
    static async getAsignatura(req, res)
    {
        // Extraemos el código de la asignatura y el usuario autenticado
        const { asig_cod } = req.params
        const { username } = req.user

        // Verificación de que la asignatura pertenece al usuario autenticado
        const { valida } = await AsignaturaModel.perteneceAUsuario({ asig_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })

        // Obtención de los detalles de la asignatura
        const { asignatura } = await AsignaturaModel.getByCodigo({ asig_cod })

        res.json(asignatura)
    }

    /**
     * Crea una nueva asignatura para un curso específico.
     * Endpoint: POST /api/asignatura
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     */
    static async postAsignatura(req, res)
    {
        // Extraemos los datos necesarios para la creación
        const { nombre, aprobabilidad, curso: curso_cod } = req.body
        const { username } = req.user

        // Validación de entrada: nombre y aprobabilidad son obligatorios
        if (!nombre) return res.status(400).json({ message: 'Nombre es requerido' })
        if (aprobabilidad === undefined) return res.status(400).json({ message: 'Aprobabilidad es requerida' })

        // Verificación de que el curso pertenece al usuario autenticado
        const { valida, plant_cod } = await CursoModel.perteneceAUsuario({ curso_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })

        // Creación de la nueva asignatura
        const { asig_cod } = await AsignaturaModel.create({ asig_nombre: nombre, asig_aprobabilidad: aprobabilidad, curso_cod })

        // Eliminación de todos los horarios relacionados con la plantilla del curso
        await PlantillaModel.deleteHorarios({ plant_cod })

        res.json({ codigo: asig_cod, nombre, aprobabilidad })
    }

    /**
     * Actualiza los datos de una asignatura específica.
     * Endpoint: PATCH /api/asignatura/:asig_cod
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     */
    static async patchAsignatura(req, res)
    {
        // Extraemos el código de la asignatura, los nuevos datos y el usuario autenticado
        const { asig_cod } = req.params
        const { nombre, aprobabilidad } = req.body
        const { username } = req.user

        // Verificación de que la asignatura pertenece al usuario autenticado
        const { valida } = await AsignaturaModel.perteneceAUsuario({ asig_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })

        // Obtención de los datos actuales de la asignatura
        const { asig_nombre: nombreActual, asig_aprobabilidad: aprobabilidadActual } = await AsignaturaModel.getSoloAsignatura({ asig_cod })

        // Actualización de los datos de la asignatura
        await AsignaturaModel.update({ 
            asig_cod, 
            asig_nombre: nombre ?? nombreActual, 
            asig_aprobabilidad: aprobabilidad ?? aprobabilidadActual 
        })

        res.json({ codigo: asig_cod, nombre: nombre ?? nombreActual, aprobabilidad: aprobabilidad ?? aprobabilidadActual })
    }

    /**
     * Elimina una asignatura específica.
     * Endpoint: DELETE /api/asignatura/:asig_cod
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     */
    static async deleteAsignatura(req, res)
    {
        // Extraemos el código de la asignatura y el usuario autenticado
        const { asig_cod } = req.params
        const { username } = req.user

        // Verificación de que la asignatura pertenece al usuario autenticado
        const { valida, plant_cod } = await AsignaturaModel.perteneceAUsuario({ asig_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })

        // Eliminación de la asignatura
        await AsignaturaModel.delete({ asig_cod })

        // Eliminación de todos los horarios relacionados con la plantilla del curso
        await PlantillaModel.deleteHorarios({ plant_cod })

        res.json({ message: 'Asignatura eliminada' })
    }
}
