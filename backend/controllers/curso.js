import { CursoModel } from '../models/curso.js';
import { CarreraModel } from '../models/carrera.js';
import { HorarioModel } from '../models/horario.js';

/**
 * Controlador para la gestión de cursos.
 */
export class CursoController {
    /**
     * Obtiene todos los cursos de una carrera específica.
     * 
     * @route GET /api/curso
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Object} - Lista de cursos de la carrera.
     */
    static async getAll(req, res) {
        const { username } = req.user;
        const { carrera } = req.body;

        // Validación de datos
        if (!carrera) return res.status(400).json({ message: 'Carrera es requerido' });

        // Verificación de la carrera asociada al usuario
        const { valida } = await CarreraModel.perteneceAUsuario({ carre_cod: carrera, username });
        if (!valida) return res.status(401).json({ message: 'No autorizado' });

        // Obtención de los cursos
        const { cursos } = await CursoModel.getByCarrera({ carre_cod: carrera });
        res.json({ cursos });
    }

    /**
     * Obtiene la información de un curso específico.
     * 
     * @route GET /api/curso/:curso_cod
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Object} - Detalles del curso.
     */
    static async getByCodigo(req, res) {
        const { username } = req.user;
        const { curso_cod } = req.params;

        // Verificación de la relación entre el curso y el usuario
        const { valida } = await CursoModel.perteneceAUsuario({ curso_cod, username });
        if (!valida) return res.status(401).json({ message: 'No autorizado' });

        // Obtención del curso
        const { curso } = await CursoModel.getByCodigo({ curso_cod });
        res.json(curso);
    }

    /**
     * Crea un nuevo curso asociado a una carrera.
     * 
     * @route POST /api/curso
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Object} - Detalles del curso creado.
     */
    static async create(req, res) {
        const { username } = req.user;
        const { carrera, nombre } = req.body;

        // Validación de datos
        if (!carrera) return res.status(400).json({ message: 'Carrera es requerido' });
        if (!nombre) return res.status(400).json({ message: 'Nombre es requerido' });

        // Verificación de la carrera asociada al usuario
        const { valida } = await CarreraModel.perteneceAUsuario({ carre_cod: carrera, username });
        if (!valida) return res.status(401).json({ message: 'No autorizado' });

        // Creación del curso
        const { curso_cod } = await CursoModel.create({ carre_cod: carrera, carre_nombre: nombre });

        // Eliminación de horarios existentes en la plantilla
        const { plant_cod } = await CarreraModel.getPlantilla({ carre_cod: carrera });
        await HorarioModel.deleteByPlantilla({ plant_cod });

        res.json({ codigo: curso_cod, nombre });
    }

    /**
     * Actualiza la información de un curso existente.
     * 
     * @route PATCH /api/curso/:curso_cod
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Object} - Detalles del curso actualizado.
     */
    static async update(req, res) {
        const { username } = req.user;
        const { curso_cod } = req.params;
        const { nombre } = req.body;

        // Validación de datos
        if (!curso_cod) return res.status(400).json({ message: 'Codigo de curso es requerido' });

        // Verificación de la relación entre el curso y el usuario
        const { valida } = await CursoModel.perteneceAUsuario({ curso_cod, username });
        if (!valida) return res.status(401).json({ message: 'No autorizado' });

        // Actualización del curso
        const { curso_nombre, exists } = await CursoModel.getSoloCurso({ curso_cod });
        if (!exists) return res.status(404).json({ message: 'Curso no encontrado' });

        await CursoModel.update({ curso_cod, curso_nombre: nombre ?? curso_nombre });
        res.json({ codigo: curso_cod, nombre: nombre ?? curso_nombre });
    }

    /**
     * Elimina un curso y sus horarios asociados.
     * 
     * @route DELETE /api/curso/:curso_cod
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Object} - Mensaje de confirmación.
     */
    static async delete(req, res) {
        const { username } = req.user;
        const { curso_cod } = req.params;

        // Validación de datos
        if (!curso_cod) return res.status(400).json({ message: 'Codigo de curso es requerido' });

        // Verificación de la relación entre el curso y el usuario
        const { valida } = await CursoModel.perteneceAUsuario({ curso_cod, username });
        if (!valida) return res.status(401).json({ message: 'No autorizado' });

        // Eliminación del curso
        const { plant_cod } = await CursoModel.getPlantilla({ curso_cod });
        await CursoModel.delete({ curso_cod });
        await HorarioModel.deleteByPlantilla({ plant_cod });

        res.json({ message: 'Curso eliminado' });
    }

    /**
     * Verifica si un curso es válido para el usuario.
     * 
     * @route GET /api/curso/verificar/:curso_cod
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Object} - Mensaje de validación.
     */
    static async verifyCurso(req, res) {
        const { username } = req.user;
        const { curso_cod } = req.params;

        // Verificación del curso asociado al usuario
        const { valida } = await CursoModel.perteneceAUsuario({ curso_cod, username });
        if (!valida) return res.status(400).json({ message: 'Curso no encontrado' });

        res.json({ message: 'Curso valido', username });
    }

    /**
     * Obtiene los detalles de un curso específico.
     * 
     * @route GET /api/curso/ver_curso/:curso_cod
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Object} - Detalles del curso.
     */
    static async verCurso(req, res) {
        const { username } = req.user;
        const { curso_cod } = req.params;

        // Verificación del curso asociado al usuario
        const { valida } = await CursoModel.perteneceAUsuario({ curso_cod, username });
        if (!valida) return res.status(400).json({ message: 'Curso no encontrado' });

        const { curso } = await CursoModel.getByCodigo({ curso_cod });
        res.json(curso);
    }

    /**
     * Obtiene los cursos relacionados a un código específico.
     * 
     * @route GET /api/curso/consultar_cursos/:curso_cod
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Object} - Lista de cursos relacionados.
     */
    static async getCursosByCodigo(req, res) {
        const { username } = req.user;
        const { curso_cod } = req.params;

        // Verificación del curso asociado al usuario
        const { valida, carre_cod } = await CursoModel.perteneceAUsuario({ curso_cod, username });
        if (!valida) return res.status(400).json({ message: 'Curso no encontrado' });

        const { cursos } = await CarreraModel.getCursos({ carre_cod });
        res.json({ cursos });
    }

    /**
     * Obtiene el código de la plantilla asociada a un curso.
     * 
     * @route GET /api/curso/ver_plantilla/:curso_cod
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Object} - Código de la plantilla.
     */
    static async getCodigoPlantilla(req, res) {
        const { username } = req.user;
        const { curso_cod } = req.params;

        // Verificación del curso asociado al usuario
        const { valida } = await CursoModel.perteneceAUsuario({ curso_cod, username });
        if (!valida) return res.status(400).json({ message: 'Curso no encontrado' });

        const { plant_cod } = await CursoModel.getPlantilla({ curso_cod });
        res.json({ plant_cod });
    }
}
