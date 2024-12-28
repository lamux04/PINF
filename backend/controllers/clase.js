import { AsignaturaModel } from "../models/asignatura.js"
import { ClaseModel } from "../models/clase.js"
import { PlantillaModel } from "../models/plantilla.js"
import { ProfesorModel } from "../models/profesor.js"

/**
 * Controlador para gestionar las clases relacionadas con las asignaturas de un usuario.
 * Proporciona métodos para listar, obtener, crear, actualizar y eliminar clases.
 */
export class ClaseController
{
    /**
     * Obtiene todas las clases asociadas a una asignatura específica.
     * @route GET /api/clase
     * @param {Object} req - Objeto de solicitud HTTP con la asignatura en el cuerpo de la petición.
     * @param {Object} res - Objeto de respuesta HTTP.
     */
    static async getClases(req, res)
    {
        const { asignatura: asig_cod } = req.body; // Código de la asignatura
        const { username } = req.user; // Nombre de usuario autenticado

        // Validar que se haya proporcionado la asignatura
        if (!asig_cod) return res.status(400).json({ message: 'Asignatura es requerida' });
        
        // Comprobar si la asignatura pertenece al usuario autenticado
        const { valida } = await AsignaturaModel.perteneceAUsuario({ asig_cod, username });
        if (!valida) return res.status(401).json({ message: 'No autorizado' });
        
        // Obtener las clases asociadas a la asignatura
        const { clases } = await ClaseModel.getByAsignatura({ asig_cod });

        res.json({ clases });
    }

    /**
     * Obtiene los detalles de una clase específica.
     * @route GET /api/clase/:clase_cod
     * @param {Object} req - Objeto de solicitud HTTP con el código de la clase en los parámetros.
     * @param {Object} res - Objeto de respuesta HTTP.
     */
    static async getClase(req, res)
    {
        const { clase_cod } = req.params; // Código de la clase
        const { username } = req.user; // Nombre de usuario autenticado

        // Comprobar si la clase pertenece al usuario autenticado
        const { valida } = await ClaseModel.perteneceAUsuario({ clase_cod, username });
        if (!valida) return res.status(401).json({ message: 'No autorizado' });

        // Obtener los detalles de la clase
        const { clase } = await ClaseModel.getByCodigo({ clase_cod });

        res.json(clase);
    }

    /**
     * Crea una nueva clase asociada a una asignatura específica.
     * @route POST /api/clase
     * @param {Object} req - Objeto de solicitud HTTP con los datos de la clase en el cuerpo de la petición.
     * @param {Object} res - Objeto de respuesta HTTP.
     */
    static async postClase(req, res)
    {
        const { descripcion, tipo, tipo_aula, duracion, profesor, asignatura: asig_cod, importante } = req.body; // Datos de la clase
        const { username } = req.user; // Nombre de usuario autenticado

        // Validar que se proporcionen todos los campos requeridos
        if (!descripcion) return res.status(400).json({ message: 'Descripcion es requerida' });
        if (!tipo) return res.status(400).json({ message: 'Tipo es requerido' });
        if (!tipo_aula) return res.status(400).json({ message: 'Tipo aula es requerido' });
        if (!duracion) return res.status(400).json({ message: 'Duracion es requerida' });
        if (!profesor) return res.status(400).json({ message: 'Profesor es requerido' });
        if (!asig_cod) return res.status(400).json({ message: 'Asignatura es requerida' });
        if (importante === undefined) return res.status(400).json({ message: 'Importante es requerido' });
        
        // Comprobar si la asignatura pertenece al usuario autenticado
        const { valida, plant_cod } = await AsignaturaModel.perteneceAUsuario({ asig_cod, username });
        if (!valida) return res.status(401).json({ message: 'No autorizado' });
        
        // Comprobar si el profesor existe y pertenece a la plantilla
        const { valida: validop } = await ProfesorModel.existe({ prof_cod: profesor, plant_cod });
        if (!validop) return res.status(400).json({ message: 'Profesor no existe' });
        
        // Crear la nueva clase
        const { clase_cod } = await ClaseModel.create({ clase_descrip: descripcion, clase_tipo: tipo, clase_tipo_aula: tipo_aula, clase_duracion: duracion, prof_cod: profesor, asig_cod, clase_importante: importante });

        // Eliminar los horarios asociados a la plantilla para garantizar la consistencia
        await PlantillaModel.deleteHorarios({ plant_cod });

        res.json({ codigo: clase_cod, descripcion, tipo, tipo_aula, duracion, profesor, importante });
    }

    /**
     * Actualiza los datos de una clase existente.
     * @route PATCH /api/clase/:clase_cod
     * @param {Object} req - Objeto de solicitud HTTP con los datos actualizados de la clase.
     * @param {Object} res - Objeto de respuesta HTTP.
     */
    static async patchClase(req, res)
    {
        const { descripcion, tipo, tipo_aula, duracion, profesor, importante } = req.body; // Nuevos datos de la clase
        const { clase_cod } = req.params; // Código de la clase
        const { username } = req.user; // Nombre de usuario autenticado
        
        // Comprobar si la clase pertenece al usuario autenticado
        const { valida, plant_cod } = await ClaseModel.perteneceAUsuario({ clase_cod, username });
        if (!valida) return res.status(401).json({ message: 'No autorizado' });
        
        if (profesor)
        {
            // Comprobar si el profesor existe
            const { valida: validop } = await ProfesorModel.existe({ prof_cod: profesor, plant_cod });
            if (!validop) return res.status(400).json({ message: 'Profesor no existe' });
        }
        
        // Obtener los datos actuales de la clase
        const { clase } = await ClaseModel.getByCodigo({ clase_cod });

        // Preparar los datos actualizados, manteniendo los valores actuales donde no se proporcionen nuevos
        const nuevaClase = {
            clase_cod: clase['codigo'],
            clase_descrip: descripcion ?? clase['descripcion'],
            clase_tipo: tipo ?? clase['tipo'],
            clase_tipo_aula: tipo_aula ?? clase['tipo aula'],
            clase_duracion: duracion ?? clase['duracion'],
            prof_cod: profesor ?? clase['codigo profesor'],
            clase_importante: importante ?? clase['importante']
        };
        
        // Actualizar la clase en la base de datos
        await ClaseModel.update(nuevaClase);

        // Eliminar los horarios asociados a la plantilla para garantizar la consistencia
        await PlantillaModel.deleteHorarios({ plant_cod });

        res.json({ codigo: nuevaClase['clase_cod'], descripcion: nuevaClase['clase_descrip'], tipo: nuevaClase['clase_tipo'], tipo_aula: nuevaClase['clase_tipo_aula'], duracion: nuevaClase['clase_duracion'], profesor: nuevaClase['prof_cod'], importante: nuevaClase['clase_importante'] });
    }

    /**
     * Elimina una clase existente.
     * @route DELETE /api/clase/:clase_cod
     * @param {Object} req - Objeto de solicitud HTTP con el código de la clase en los parámetros.
     * @param {Object} res - Objeto de respuesta HTTP.
     */
    static async deleteClase(req, res)
    {
        const { clase_cod } = req.params; // Código de la clase
        const { username } = req.user; // Nombre de usuario autenticado

        // Comprobar si la clase pertenece al usuario autenticado
        const { valida, plant_cod } = await ClaseModel.perteneceAUsuario({ clase_cod, username });
        if (!valida) return res.status(401).json({ message: 'No autorizado' });

        // Eliminar la clase de la base de datos
        await ClaseModel.delete({ clase_cod });

        // Eliminar los horarios asociados a la plantilla para garantizar la consistencia
        await PlantillaModel.deleteHorarios({ plant_cod });

        res.json({ message: 'Clase eliminada' });
    }
}
