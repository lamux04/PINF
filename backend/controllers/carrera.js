import { CarreraModel } from "../models/carrera.js";
import { HorarioModel } from "../models/horario.js";
import { PlantillaModel } from "../models/plantilla.js";

export class CarreraController
{
    // GET /api/carrera { plantilla }
    static async getByPlantiilla(req, res)
    {
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

    // GET /api/carrera/:carre_cod
    static async getByCodigo(req, res)
    {
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

    // POST /api/carrera { plantilla, nombre }
    static async create(req, res)
    {
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

    // PATCH /api/carrera/:carre_cod { nombre }
    static async update(req, res)
    {
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

    // DELETE /api/carrera/:carre_cod
    static async delete(req, res)
    {
        // Obtenemos los atributos
        const { carre_cod } = req.params;
        const { username } = req.user;

        // Comprobamos que la carrera sea del usuario
        const { valida } = await CarreraModel.perteneceAUsuario({ carre_cod, username });
        if (!valida) return res.status(401).json({ message: 'No autorizado' });

        // Eliminamos la carrera
        await CarreraModel.delete({ carre_cod });

        // Eliminamos todos los horarios de la plantilla
        await HorarioModel.deleteByPlantilla({ plant_cod: plantilla });

        res.json({ message: 'Carrera eliminada' });
    }
}