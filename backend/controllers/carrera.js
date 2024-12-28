import { CarreraModel } from "../models/carrera.js";
import { HorarioModel } from "../models/horario.js";
import { PlantillaModel } from "../models/plantilla.js";

/**
 * Controlador para gestionar las carreras asociadas a plantillas.
 * Proporciona métodos para obtener, crear, actualizar y eliminar carreras.
 */
export class CarreraController {
    /**
     * Obtiene las carreras asociadas a una plantilla específica.
     * @param {Object} req - Objeto de solicitud HTTP que contiene la plantilla en el cuerpo de la solicitud.
     * @param {Object} res - Objeto de respuesta HTTP.
     */
    static async getByPlantiilla(req, res) {
        // Obtenemos los atributos
        const { plantilla } = req.body;
        const { username } = req.user;

        // Validamos los atributos
        if (!plantilla) return res.status(400).json({ message: 'Plantilla es requerido' });

        // Comprobamos que la plantilla sea del usuario
        const { valida } = await PlantillaModel.perteneceAUsuario({ plant_cod: plantilla, username });
        if (!valida) return res.status(401).json({ message: 'No autorizado' });

        // Obtenemos las carreras
        const { carreras } = await CarreraModel.getByPlantilla({ plant_cod: plantilla });

        res.json({ carreras });
    }

    /**
     * Obtiene la información de una carrera por su código.
     * @param {Object} req - Objeto de solicitud HTTP que contiene el código de la carrera como parámetro de ruta.
     * @param {Object} res - Objeto de respuesta HTTP.
     */
    static async getByCodigo(req, res) {
        // Obtenemos los atributos
        const { carre_cod } = req.params;
        const { username } = req.user;

        // Comprobamos que la carrera sea del usuario
        const { valida } = await CarreraModel.perteneceAUsuario({ carre_cod, username });
        if (!valida) return res.status(401).json({ message: 'No autorizado' });

        // Obtenemos la carrera
        const { carrera } = await CarreraModel.getByCodigo({ carre_cod });

        res.json(carrera);
    }

    /**
     * Crea una nueva carrera asociada a una plantilla específica.
     * @param {Object} req - Objeto de solicitud HTTP que contiene los datos de la carrera en el cuerpo de la solicitud.
     * @param {Object} res - Objeto de respuesta HTTP.
     */
    static async create(req, res) {
        // Obtenemos los atributos
        const { plantilla, nombre } = req.body;
        const { username } = req.user;

        // Validamos los atributos
        if (!plantilla) return res.status(400).json({ message: 'Plantilla es requerido' });
        if (!nombre) return res.status(400).json({ message: 'Nombre es requerido' });

        // Comprobamos que la plantilla sea del usuario
        const { valida } = await PlantillaModel.perteneceAUsuario({ plant_cod: plantilla, username });
        if (!valida) return res.status(401).json({ message: 'No autorizado' });

        // Creamos la carrera
        const carrera = await CarreraModel.create({ plant_cod: plantilla, carre_nombre: nombre });

        // Eliminamos todos los horarios de la plantilla
        await HorarioModel.deleteByPlantilla({ plant_cod: plantilla });

        res.json({
            codigo: carrera.carre_cod,
            nombre: carrera.carre_nombre
        });
    }

    /**
     * Actualiza la información de una carrera específica.
     * @param {Object} req - Objeto de solicitud HTTP que contiene los datos actualizados en el cuerpo de la solicitud.
     * @param {Object} res - Objeto de respuesta HTTP.
     */
    static async update(req, res) {
        // Obtenemos los atributos
        const { carre_cod } = req.params;
        const { nombre } = req.body;
        const { username } = req.user;

        // Comprobamos que la carrera sea del usuario
        const { valida } = await CarreraModel.perteneceAUsuario({ carre_cod, username });
        if (!valida) return res.status(401).json({ message: 'No autorizado' });

        // Obtenemos el nombre actual de la carrera
        const { carre_nombre: nombreActual, exists } = await CarreraModel.getSoloCarrera({ carre_cod });
        if (!exists) return res.status(404).json({ message: 'Carrera no encontrada' });

        // Actualizamos la carrera
        const carrera = await CarreraModel.update({ carre_cod, carre_nombre: nombre ?? nombreActual });

        res.json({ codigo: carrera.carre_cod, nombre: carrera.carre_nombre });
    }

    /**
     * Elimina una carrera específica y sus horarios asociados a la plantilla.
     * @param {Object} req - Objeto de solicitud HTTP que contiene el código de la carrera como parámetro de ruta.
     * @param {Object} res - Objeto de respuesta HTTP.
     */
    static async delete(req, res) {
        // Obtenemos los atributos
        const { carre_cod } = req.params;
        const { username } = req.user;

        // Comprobamos que la carrera sea del usuario
        const { valida } = await CarreraModel.perteneceAUsuario({ carre_cod, username });
        if (!valida) return res.status(401).json({ message: 'No autorizado' });

        // Obtenemos el código de la plantilla
        const { plant_cod } = await CarreraModel.getPlantilla({ carre_cod });
        
        // Eliminamos la carrera
        await CarreraModel.delete({ carre_cod });

        // Eliminamos todos los horarios de la plantilla
        await HorarioModel.deleteByPlantilla({ plant_cod });

        res.json({ message: 'Carrera eliminada' });
    }
}