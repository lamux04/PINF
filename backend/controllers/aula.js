// Importación de los modelos necesarios para manejar la lógica de negocio
import { AulaModel } from "../models/aula.js"
import { PlantillaModel } from "../models/plantilla.js"

// Definición del controlador para gestionar aulas
export class AulaController
{
    /**
     * Obtiene todas las aulas asociadas a una plantilla específica.
     * Endpoint: GET /api/aula
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     */
    static async getAulas(req, res)
    {
        // Extraemos el código de la plantilla y el usuario autenticado
        const { plantilla: plant_cod } = req.query
        const { username } = req.user

        // Validación de entrada: se requiere el código de la plantilla
        if (!plant_cod) return res.status(400).json({ message: 'Plantilla es requerido' })

        // Verificación de que la plantilla pertenece al usuario autenticado
        const { valida } = await PlantillaModel.perteneceAUsuario({ plant_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })

        // Obtención de las aulas asociadas a la plantilla
        const { aulas } = await AulaModel.getByPlantilla({ plant_cod })

        res.json({ aulas })
    }

    /**
     * Obtiene los detalles de un aula específica.
     * Endpoint: GET /api/aula/:aula_cod
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     */
    static async getAula(req, res)
    {
        // Extraemos el código del aula y el usuario autenticado
        const { aula_cod } = req.params
        const { username } = req.user

        // Verificación de que el aula pertenece al usuario autenticado
        const { valida } = await AulaModel.perteneceAUsuario({ aula_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })

        // Obtención de los detalles del aula
        const { aula } = await AulaModel.getByCodigo({ aula_cod })

        res.json(aula)
    }

    /**
     * Crea un nuevo aula asociada a una plantilla.
     * Endpoint: POST /api/aula
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     */
    static async createAula(req, res)
    {
        // Extraemos los datos necesarios para la creación
        const { plantilla: plant_cod, nombre: aula_nombre, tipo: aula_tipo } = req.body
        const { username } = req.user

        // Validación de entrada: plantilla, nombre y tipo son obligatorios
        if (!plant_cod) return res.status(400).json({ message: 'Plantilla es requerida' })
        if (!aula_nombre) return res.status(400).json({ message: 'Nombre es requerido' })
        if (!aula_tipo) return res.status(400).json({ message: 'Tipo es requerido' })

        // Verificación de que la plantilla pertenece al usuario autenticado
        const { valida } = await PlantillaModel.perteneceAUsuario({ plant_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })

        // Creación del aula
        const { aula_cod } = await AulaModel.create({ plant_cod, aula_nombre, aula_tipo })

        res.json({ codigo: aula_cod, nombre: aula_nombre, tipo: aula_tipo })
    }

    /**
     * Actualiza los datos de un aula específica.
     * Endpoint: PATCH /api/aula/:aula_cod
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     */
    static async updateAula(req, res)
    {
        // Extraemos el código del aula, los nuevos datos y el usuario autenticado
        const { aula_cod } = req.params
        const { nombre: aula_nombre, tipo: aula_tipo } = req.body
        const { username } = req.user

        // Verificación de que el aula pertenece al usuario autenticado
        const { valida, plant_cod } = await AulaModel.perteneceAUsuario({ aula_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })

        // Obtención de los datos actuales del aula
        const { aula } = await AulaModel.getByCodigo({ aula_cod })

        // Construcción de los nuevos datos del aula
        const nuevaAula = {
            aula_cod: aula_cod,
            aula_nombre: aula_nombre ?? aula['nombre'],
            aula_tipo: aula_tipo ?? aula['tipo']
        }

        // Actualización de los datos del aula
        await AulaModel.update(nuevaAula)

        // Eliminación de todos los horarios relacionados con la plantilla
        await PlantillaModel.deleteHorarios({ plant_cod })

        res.json({ codigo: nuevaAula.aula_cod, nombre: nuevaAula.aula_nombre, tipo: nuevaAula.aula_tipo })
    }

    /**
     * Elimina un aula específica.
     * Endpoint: DELETE /api/aula/:aula_cod
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     */
    static async deleteAula(req, res)
    {
        // Extraemos el código del aula y el usuario autenticado
        const { aula_cod } = req.params
        const { username } = req.user

        // Verificación de que el aula pertenece al usuario autenticado
        const { valida, plant_cod } = await AulaModel.perteneceAUsuario({ aula_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })

        // Eliminación del aula
        await AulaModel.delete({ aula_cod })

        // Eliminación de todos los horarios relacionados con la plantilla
        await PlantillaModel.deleteHorarios({ plant_cod })

        res.json({ message: 'Aula eliminada' })
    }
}
