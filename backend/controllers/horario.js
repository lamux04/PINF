/**
 * HorarioController - Controlador para gestionar horarios.
 */
import { HorarioModel } from '../models/horario.js';
import { AuthModel } from '../models/auth.js';
import { PlantillaModel } from '../models/plantilla.js';
import { json } from 'express';

const endpoint = `${process.env.API_HOST}/sched4allAPI/`;

export class HorarioController {
    /**
     * Obtiene todos los horarios que un usuario puede visualizar.
     * @route GET /horario
     * @access Autenticado
     * @param {object} req - Petición HTTP.
     * @param {object} res - Respuesta HTTP.
     * @returns {object} Lista de horarios.
     */
    static async getAll(req, res) {
        const { username } = req.user;
        const { horarios } = await HorarioModel.getHorariosQueVeUsuario({ username });
        res.json({ horarios });
    }

    /**
     * Obtiene un horario específico por su código.
     * @route GET /horario/:horar_cod
     * @access Autenticado
     * @param {object} req - Petición HTTP.
     * @param {object} res - Respuesta HTTP.
     * @returns {object} Datos del horario.
     */
    static async getByCodigo(req, res) {
        const { username } = req.user;
        const { horar_cod } = req.params;

        const { valido: valido1 } = await HorarioModel.puedeVer({ horar_cod, username });
        const { valido: valido2 } = await HorarioModel.perteneceAUsuario({ horar_cod, username });
        if (!valido1 && !valido2) return res.status(401).json({ message: 'No autorizado' });

        const { horario, exists: existsh } = await HorarioModel.getByCodigo({ horar_cod });
        if (!existsh) return res.status(400).json({ message: 'Horario no encontrado' });

        res.json(horario);
    }

    /**
     * Crea un nuevo horario basado en una plantilla.
     * @route POST /horario
     * @access Autenticado
     * @param {object} req - Petición HTTP.
     * @param {object} res - Respuesta HTTP.
     * @returns {object} Código del horario creado.
     */
    static async create(req, res) {
        const { username } = req.user;
        const { plantilla: plant_cod, nombre, h_ini, h_fin, inicio_desc, fin_desc } = req.body;

        const { valida } = await PlantillaModel.perteneceAUsuario({ plant_cod, username });
        if (!valida) return res.status(400).json({ message: 'Plantilla no encontrada' });

        
        const { datos } = await HorarioModel.getDatos({ plant_cod });
        datos['h_ini'] = h_ini;
        datos['h_fin'] = h_fin;
        datos['inicio_desc'] = inicio_desc;
        datos['fin_desc'] = fin_desc;
        
        const response = await fetch(`${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        
        if (response.status !== 200) return res.status(400).json({ message: 'Error al generar el horario' });
        const { horar_cod } = await HorarioModel.create({ plant_cod, nombre, h_ini, h_fin });

        const data = await response.json();
        await HorarioModel.saveData({ horar_cod, data });
        await HorarioModel.addVisualizador({ horar_cod, username });

        return res.json({ horar_cod });
    }

    /**
     * Elimina un horario.
     * @route DELETE /horario/:horar_cod
     * @access Autenticado
     * @param {object} req - Petición HTTP.
     * @param {object} res - Respuesta HTTP.
     * @returns {object} Mensaje de éxito.
     */
    static async delete(req, res) {
        const { username } = req.user;
        const { horar_cod } = req.params;

        const { valido } = await HorarioModel.perteneceAUsuario({ horar_cod, username });
        if (!valido) return res.status(400).json({ message: 'Horario no encontrado' });

        await HorarioModel.deleteByCodigo({ horar_cod });

        res.json({ message: 'Horario eliminado correctamente' });
    }

    /**
     * Añade al usuario como visualizador de un horario.
     * @route POST /horario/visualizar
     * @access Autenticado
     * @param {object} req - Petición HTTP.
     * @param {object} res - Respuesta HTTP.
     * @returns {object} Mensaje y datos del horario.
     */
    static async visualizar(req, res) {
        const { horario: horar_cod } = req.body;
        const { username } = req.user;

        const { exists } = await HorarioModel.existe({ horar_cod });
        if (!exists) return res.status(400).json({ message: 'Horario no encontrado' });

        const { valido } = await HorarioModel.puedeVer({ horar_cod, username });
        if (valido) return res.status(400).json({ message: 'Ya puedes ver el horario' });

        await HorarioModel.addVisualizador({ horar_cod, username });
        const { nombre } = await HorarioModel.getNombre({ horar_cod });

        res.json({ message: 'Usuario añadido correctamente', codigo: horar_cod, nombre });
    }

    /**
     * Elimina al usuario como visualizador de un horario.
     * @route DELETE /horario/visualizar
     * @access Autenticado
     * @param {object} req - Petición HTTP.
     * @param {object} res - Respuesta HTTP.
     * @returns {object} Mensaje de éxito.
     */
    static async noVisualizar(req, res) {
        const { horario: horar_cod } = req.body;
        const { username } = req.user;

        const { exists } = await HorarioModel.existe({ horar_cod });
        if (!exists) return res.status(400).json({ message: 'Horario no encontrado' });

        await HorarioModel.deleteVisualizador({ horar_cod, username });

        res.json({ message: 'Visualización eliminada correctamente' });
    }

    /**
     * Obtiene horarios generados de una plantilla.
     * @route GET /horario/horarios_generados/:horar_cod
     * @access Autenticado
     * @param {object} req - Petición HTTP.
     * @param {object} res - Respuesta HTTP.
     * @returns {object} Lista de horarios generados.
     */
    static async getHorariosGenerados(req, res) {
        const { username } = req.user;
        const { plant_cod } = req.params;

        const { valida } = await PlantillaModel.perteneceAUsuario({ plant_cod, username });
        if (!valida) return res.status(400).json({ message: 'Plantilla no encontrada' });

        const { horarios } = await HorarioModel.getHorariosGenerados({ plant_cod });

        res.json({ horarios });
    }

    /**
     * Verifica si un usuario tiene acceso a un horario.
     * @route GET /horario/verificar/:horar_cod
     * @access Autenticado
     * @param {object} req - Petición HTTP.
     * @param {object} res - Respuesta HTTP.
     * @returns {object} Información de acceso al horario.
     */
    static async verificar(req, res) {
        const { username } = req.user;
        const { horar_cod } = req.params;

        const { valido } = await HorarioModel.puedeVer({ horar_cod, username });
        const { valido: valido2 } = await HorarioModel.perteneceAUsuario({ horar_cod, username });
        if (!valido && !valido2) return res.status(400).json({ message: 'El usuario no puede ver el horario' });

        res.json({ username, horar_cod });
    }
}