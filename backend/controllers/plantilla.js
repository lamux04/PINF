import { AuthModel } from "../models/auth.js"
import { PlantillaModel } from "../models/plantilla.js"

/**
 * Controlador para la gestión de plantillas.
 */
export class PlantillaController {
    /**
     * Obtiene todas las plantillas de un usuario.
     * 
     * @route GET /api/plantilla
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Object} - Lista de plantillas del usuario.
     */
    static async getAll(req, res) {
        const { username } = req.user;

        // Verificación de la existencia del usuario
        const { exists } = await AuthModel.getByUsername({ username });
        if (!exists) return res.status(400).json({ message: 'Usuario no encontrado' });
        
        // Obtención de las plantillas del usuario
        const { plantillas } = await PlantillaModel.getByUsername({ username });
        res.json({ plantillas });
    }

    /**
     * Obtiene una lista de plantillas asociadas al usuario.
     * 
     * @route GET /api/plantilla/lista_plantillas
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Object} - Lista de plantillas del usuario.
     */
    static async getLista(req, res) {
        const { username } = req.user;

        // Verificación de la existencia del usuario
        const { exists } = await AuthModel.getByUsername({ username });
        if (!exists) return res.status(400).json({ message: 'Usuario no encontrado' });

        // Obtención de la lista de plantillas del usuario
        const { plantillas } = await PlantillaModel.getListaPlantillas({ username });
        res.json({ plantillas });
    }

    /**
     * Obtiene una plantilla específica por su código.
     * 
     * @route GET /api/plantilla/:plant_cod
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Object} - Detalles de la plantilla.
     */
    static async getByCodigo(req, res) {
        const { username } = req.user;
        const { plant_cod } = req.params;

        // Verificación de la existencia del usuario
        const { exists } = await AuthModel.getByUsername({ username });
        if (!exists) return res.status(400).json({ message: 'Usuario no encontrado' });

        // Verificación de la pertenencia de la plantilla al usuario
        const { valida } = await PlantillaModel.perteneceAUsuario({ plant_cod, username });
        if (!valida) return res.status(400).json({ message: 'Plantilla no encontrada' });

        // Obtención de la plantilla por su código
        const { plantilla, exists: existsp } = await PlantillaModel.getByCodigo({ plant_cod });
        if (!existsp) return res.status(400).json({ message: 'Plantilla no encontrada' });

        res.json(plantilla);
    }

    /**
     * Crea una nueva plantilla para el usuario.
     * 
     * @route POST /api/plantilla
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Object} - Detalles de la nueva plantilla creada.
     */
    static async create(req, res) {
        const { username } = req.user;
        const { nombre } = req.body;

        // Verificación de la existencia del usuario
        const { exists } = await AuthModel.getByUsername({ username });
        if (!exists) return res.status(400).json({ message: 'Usuario no encontrado' });

        // Validación del nombre de la plantilla
        if (!nombre) return res.status(400).json({ message: 'Falta el nombre de la plantilla' });

        // Creación de la plantilla
        const { plant_cod } = await PlantillaModel.create({ nombre, username });

        res.json({ codigo: plant_cod, nombre });
    }

    /**
     * Actualiza una plantilla existente.
     * 
     * @route PATCH /api/plantilla/:plant_cod
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Object} - Detalles de la plantilla actualizada.
     */
    static async update(req, res) {
        const { username } = req.user;
        const { plant_cod } = req.params;
        const { nombre } = req.body;

        // Verificación de la existencia del usuario
        const { exists } = await AuthModel.getByUsername({ username });
        if (!exists) return res.status(400).json({ message: 'Usuario no encontrado' });

        // Verificación de la pertenencia de la plantilla al usuario
        const { valida } = await PlantillaModel.perteneceAUsuario({ plant_cod, username });
        if (!valida) return res.status(400).json({ message: 'Plantilla no encontrada' });

        // Si no se proporciona nombre, devolvemos la plantilla actual
        if (!nombre) {
            const { plantilla, exists: existsp } = await PlantillaModel.getSoloPlantillaByCodigo({ plant_cod });
            if (!existsp) return res.status(400).json({ message: 'Plantilla no encontrada' });
            return res.json(plantilla);
        }

        // Actualización de la plantilla
        const { exists: existsp } = await PlantillaModel.update({ plant_cod, nombre });
        if (!existsp) return res.status(400).json({ message: 'Plantilla no encontrada' });

        res.json({ codigo: plant_cod, nombre });
    }

    /**
     * Elimina una plantilla.
     * 
     * @route DELETE /api/plantilla/:plant_cod
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Object} - Mensaje de confirmación de eliminación.
     */
    static async delete(req, res) {
        const { username } = req.user;
        const { plant_cod } = req.params;

        // Verificación de la existencia del usuario
        const { exists } = await AuthModel.getByUsername({ username });
        if (!exists) return res.status(400).json({ message: 'Usuario no encontrado' });

        // Verificación de la pertenencia de la plantilla al usuario
        const { valida } = await PlantillaModel.perteneceAUsuario({ plant_cod, username });
        if (!valida) return res.status(400).json({ message: 'Plantilla no encontrada' });

        // Eliminación de la plantilla
        const { exists: existsp } = await PlantillaModel.delete({ plant_cod });
        if (!existsp) return res.status(400).json({ message: 'Plantilla no encontrada' });

        res.json({ message: 'Plantilla eliminada' });
    }

    /**
     * Verifica si una plantilla pertenece al usuario.
     * 
     * @route GET /api/plantilla/verificar
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Object} - Mensaje de validación.
     */
    static async verificar(req, res) {
        const { username } = req.user;
        const { plant_cod } = req.params;

        // Verificación de la existencia del usuario
        const { exists } = await AuthModel.getByUsername({ username });
        if (!exists) return res.status(400).json({ message: 'Usuario no encontrado' });

        // Verificación de la pertenencia de la plantilla al usuario
        const { valida } = await PlantillaModel.perteneceAUsuario({ plant_cod, username });
        if (!valida) return res.status(400).json({ message: 'Plantilla no encontrada' });

        res.json({ message: 'Usuario válido', username });
    }

    /**
     * Obtiene los detalles de una plantilla.
     * 
     * @route GET /api/plantilla/ver_plantilla
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Object} - Detalles de la plantilla.
     */
    static async verPlantilla(req, res) {
        const { username } = req.user;
        const { plant_cod } = req.params;

        // Verificación de la existencia del usuario
        const { exists } = await AuthModel.getByUsername({ username });
        if (!exists) return res.status(400).json({ message: 'Usuario no encontrado' });

        // Verificación de la pertenencia de la plantilla al usuario
        const { valida } = await PlantillaModel.perteneceAUsuario({ plant_cod, username });
        if (!valida) return res.status(400).json({ message: 'Plantilla no encontrada' });

        // Obtención de los detalles de la plantilla
        const { plantilla } = await PlantillaModel.getVerPlantilla({ plant_cod });

        res.json(plantilla);
    }
}
