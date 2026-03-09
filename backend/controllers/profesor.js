import { PlantillaModel } from "../models/plantilla.js";
import { ProfesorModel } from "../models/profesor.js";

/**
 * Controlador para la gestión de profesores.
 */
export class ProfesorController {
    /**
     * Obtiene los profesores asociados a una plantilla de un usuario.
     * 
     * @route GET /api/profesor
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Object} - Lista de profesores de la plantilla.
     */
    static async getProfesores(req, res) {
        const { plantilla: plant_cod } = req.query;
        const { username } = req.user;

        // Validación de atributos
        if (!plant_cod) return res.status(400).json({ message: 'Plantilla es requerido' });

        // Verificación de la plantilla asociada al usuario
        const { valida } = await PlantillaModel.perteneceAUsuario({ plant_cod, username });
        if (!valida) return res.status(401).json({ message: 'No autorizado' });

        // Obtención de los profesores
        const { profesores } = await ProfesorModel.getByPlantilla({ plant_cod });

        res.json({ profesores });
    }

    /**
     * Obtiene un profesor específico por su código.
     * 
     * @route GET /api/profesor/:prof_cod
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Object} - Detalles del profesor.
     */
    static async getProfesor(req, res) {
        const { prof_cod } = req.params;
        const { username } = req.user;

        // Verificación de que el profesor pertenece al usuario
        const { valida } = await ProfesorModel.perteneceAUsuario({ prof_cod, username });
        if (!valida) return res.status(401).json({ message: 'No autorizado' });

        // Obtención de los detalles del profesor
        const { profesor } = await ProfesorModel.getByCodigo({ prof_cod });

        res.json(profesor);
    }

    /**
     * Crea un nuevo profesor asociado a una plantilla.
     * 
     * @route POST /api/profesor
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Object} - Detalles del nuevo profesor creado.
     */
    static async createProfesor(req, res) {
        const { plantilla: plant_cod, nombre: prof_nombre, apellido1: prof_apell1, apellido2: prof_apell2 } = req.body;
        const { username } = req.user;

        // Validación de los atributos
        if (!plant_cod) return res.status(400).json({ message: 'Plantilla es requerida' });
        if (!prof_nombre) return res.status(400).json({ message: 'Nombre es requerido' });
        if (!prof_apell1) return res.status(400).json({ message: 'Apellido1 es requerido' });
        if (!prof_apell2) return res.status(400).json({ message: 'Apellido2 es requerido' });

        // Verificación de la plantilla asociada al usuario
        const { valida } = await PlantillaModel.perteneceAUsuario({ plant_cod, username });
        if (!valida) return res.status(401).json({ message: 'No autorizado' });

        // Creación del nuevo profesor
        const { prof_cod } = await ProfesorModel.create({ plant_cod, prof_nombre, prof_apell1, prof_apell2 });

        res.json({ codigo: prof_cod, nombre: prof_nombre, apellidos: `${prof_apell1} ${prof_apell2}` });
    }

    /**
     * Actualiza los datos de un profesor específico.
     * 
     * @route PATCH /api/profesor/:prof_cod
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Object} - Detalles del profesor actualizado.
     */
    static async updateProfesor(req, res) {
        const { nombre: prof_nombre, apellido1: prof_apell1, apellido2: prof_apell2 } = req.body;
        const { prof_cod } = req.params;
        const { username } = req.user;

        // Verificación de que el profesor pertenece al usuario
        const { valida } = await ProfesorModel.perteneceAUsuario({ prof_cod, username });
        if (!valida) return res.status(401).json({ message: 'No autorizado' });

        // Obtención de los detalles del profesor
        const { profesor } = await ProfesorModel.getByCodigo({ prof_cod });

        // Preparación de los nuevos datos del profesor
        const nuevoProfesor = {
            prof_cod,
            prof_nombre: prof_nombre ?? profesor['prof_nombre'],
            prof_apell1: prof_apell1 ?? profesor['apellidos'].split(' ')[0],
            prof_apell2: prof_apell2 ?? profesor['apellidos'].split(' ')[1]
        };

        // Actualización del profesor
        await ProfesorModel.update(nuevoProfesor);

        res.json({ 
            codigo: nuevoProfesor.prof_cod, 
            nombre: nuevoProfesor.prof_nombre, 
            apellido1: nuevoProfesor.prof_apell1, 
            apellido2: nuevoProfesor.prof_apell2 
        });
    }

    /**
     * Elimina un profesor específico.
     * 
     * @route DELETE /api/profesor/:prof_cod
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Object} - Mensaje de confirmación de eliminación.
     */
    static async deleteProfesor(req, res) {
        const { prof_cod } = req.params;
        const { username } = req.user;

        // Verificación de que el profesor pertenece al usuario
        const { valida } = await ProfesorModel.perteneceAUsuario({ prof_cod, username });
        if (!valida) return res.status(401).json({ message: 'No autorizado' });

        // Eliminación del profesor
        await ProfesorModel.delete({ prof_cod });

        res.json({ message: 'Profesor eliminado' });
    }
}
