import { promisePool } from "../db.js";
import { AulaModel } from "./aula.js";
import { CarreraModel } from "./carrera.js";
import { HorarioModel } from "./horario.js";
import { ProfesorModel } from "./profesor.js";
import { v4 } from 'uuid'

/**
 * Modelo para gestionar las plantillas creadas por un usuario.
 * Contiene métodos para obtener, crear, actualizar, eliminar plantillas y gestionar sus relaciones con otros elementos (carreras, cursos, asignaturas, profesores, etc.)
 */
export class PlantillaModel
{
    /**
     * Obtiene todas las plantillas creadas por un usuario.
     * 
     * @param {Object} param0 - Objeto con el nombre de usuario.
     * @param {string} param0.username - Nombre de usuario.
     * @returns {Object} - Un objeto con la lista de plantillas creadas por el usuario.
     */
    static async getByUsername({ username })
    {
        // Seleccionamos todas las plantillas del usuario
        const [rows] = await promisePool.query('SELECT plant_cod AS codigo, plant_nombre AS nombre FROM PLANTILLA WHERE usu_username = ?', [username]);

        const plantillas = []

        // Para cada plantilla, obtenemos sus relaciones con carreras, horarios, aulas y profesores
        for (let row of rows)
        {
            const { carreras } = await CarreraModel.getByPlantilla({ plant_cod: row["codigo"] });
            row["carreras"] = carreras;

            const { horarios } = await HorarioModel.getByPlantilla({ plant_cod: row["codigo"] });
            row["horarios"] = horarios;

            const { aulas } = await AulaModel.getByPlantilla({ plant_cod: row["codigo"] });
            row["aulas"] = aulas;

            const { profesores } = await ProfesorModel.getByPlantilla({ plant_cod: row["codigo"] });
            row["profesores"] = profesores;

            plantillas.push(row);
        }

        return { plantillas };
    }

    /**
     * Obtiene solo los códigos y nombres de las plantillas creadas por un usuario.
     * 
     * @param {Object} param0 - Objeto con el nombre de usuario.
     * @param {string} param0.username - Nombre de usuario.
     * @returns {Object} - Un objeto con la lista de plantillas.
     */
    static async getListaPlantillas({ username })
    {
        // Seleccionamos todas las plantillas del usuario
        const [rows] = await promisePool.query('SELECT plant_cod AS codigo, plant_nombre AS nombre FROM PLANTILLA WHERE usu_username = ?', [username]);

        return { plantillas: rows };
    }

    /**
     * Obtiene una plantilla específica por su código.
     * 
     * @param {Object} param0 - Objeto con el código de la plantilla.
     * @param {string} param0.plant_cod - Código de la plantilla.
     * @returns {Object} - Un objeto con los detalles de la plantilla y sus relaciones.
     */
    static async getByCodigo({ plant_cod })
    {
        const [rows] = await promisePool.query('SELECT plant_cod AS codigo, plant_nombre AS nombre FROM PLANTILLA WHERE plant_cod = ?', [plant_cod]);

        if (rows.length === 0) return { exists: false };

        const plantilla = rows[0];

        // Obtenemos las carreras, horarios, aulas y profesores asociados a la plantilla
        const { carreras } = await CarreraModel.getByPlantilla({ plant_cod });
        plantilla["carreras"] = carreras;

        const { horarios } = await HorarioModel.getByPlantilla({ plant_cod });
        plantilla["horarios"] = horarios;

        const { aulas } = await AulaModel.getByPlantilla({ plant_cod });
        plantilla["aulas"] = aulas;

        const { profesores } = await ProfesorModel.getByPlantilla({ plant_cod });
        plantilla["profesores"] = profesores;

        return { plantilla, exists: true };
    }

    /**
     * Crea una nueva plantilla con el nombre dado.
     * 
     * @param {Object} param0 - Objeto con el nombre de la plantilla y el nombre de usuario.
     * @param {string} param0.nombre - Nombre de la plantilla.
     * @param {string} param0.username - Nombre de usuario.
     * @returns {Object} - Un objeto con el código de la nueva plantilla creada.
     */
    static async create({ nombre, username })
    {
        const codigo = v4();

        // Creamos la plantilla en la base de datos
        await promisePool.query('INSERT INTO PLANTILLA (plant_cod, plant_nombre, usu_username) VALUES (?, ?, ?)', [codigo, nombre, username]);

        return { plant_cod: codigo };
    }

    /**
     * Obtiene solo los detalles de la plantilla con el código dado.
     * 
     * @param {Object} param0 - Objeto con el código de la plantilla.
     * @param {string} param0.plant_cod - Código de la plantilla.
     * @returns {Object} - Un objeto con los detalles de la plantilla, o un indicador de existencia.
     */
    static async getSoloPlantillaByCodigo({ plant_cod })
    {
        const [rows] = await promisePool.query('SELECT plant_cod AS codigo, plant_nombre AS nombre FROM PLANTILLA WHERE plant_cod = ?', [plant_cod]);

        if (rows.length === 0) return { exists: false };

        return { plantilla: rows[0], exists: true };
    }

    /**
     * Actualiza el nombre de una plantilla existente.
     * 
     * @param {Object} param0 - Objeto con el código de la plantilla y el nuevo nombre.
     * @param {string} param0.plant_cod - Código de la plantilla.
     * @param {string} param0.nombre - Nuevo nombre para la plantilla.
     * @returns {Object} - Un objeto con un indicador de existencia de la plantilla.
     */
    static async update({ plant_cod, nombre })
    {
        const { exists } = await PlantillaModel.getSoloPlantillaByCodigo({ plant_cod });
        if (!exists) return { exists: false };

        // Actualizamos el nombre de la plantilla
        await promisePool.query('UPDATE PLANTILLA SET plant_nombre = ? WHERE plant_cod = ?', [nombre, plant_cod]);

        return { exists: true };
    }

    /**
     * Elimina una plantilla por su código.
     * 
     * @param {Object} param0 - Objeto con el código de la plantilla.
     * @param {string} param0.plant_cod - Código de la plantilla.
     * @returns {Object} - Un objeto con un indicador de existencia de la plantilla.
     */
    static async delete({ plant_cod })
    {
        const { exists } = await PlantillaModel.getSoloPlantillaByCodigo({ plant_cod });
        if (!exists) return { exists: false };

        // Eliminamos la plantilla
        await promisePool.query('DELETE FROM PLANTILLA WHERE plant_cod = ?', [plant_cod]);

        return { exists: true };
    }

    /**
     * Verifica si una plantilla pertenece a un usuario.
     * 
     * @param {Object} param0 - Objeto con el código de la plantilla y el nombre de usuario.
     * @param {string} param0.plant_cod - Código de la plantilla.
     * @param {string} param0.username - Nombre de usuario.
     * @returns {Object} - Un objeto con un indicador de validez de la relación entre la plantilla y el usuario.
     */
    static async perteneceAUsuario({ plant_cod, username })
    {
        const [rows] = await promisePool.query('SELECT COUNT(*) as count FROM PLANTILLA WHERE plant_cod = ? AND usu_username = ?', [plant_cod, username]);

        return { valida: rows[0]["count"] > 0 };
    }

    /**
     * Obtiene los detalles completos de la plantilla, incluyendo carreras, cursos, asignaturas, y profesores.
     * 
     * @param {Object} param0 - Objeto con el código de la plantilla.
     * @param {string} param0.plant_cod - Código de la plantilla.
     * @returns {Object} - Un objeto con los detalles completos de la plantilla y un indicador de existencia.
     */
    static async getVerPlantilla({ plant_cod })
    {
        const [rows] = await promisePool.query('SELECT plant_cod AS codigo, plant_nombre AS nombre FROM PLANTILLA WHERE plant_cod = ?', [plant_cod]);

        if (rows.length === 0) return { exists: false };

        const plantilla = rows[0];

        // Obtenemos las carreras y cursos de la plantilla
        const [carreras] = await promisePool.query('SELECT carre_cod AS codigo, carre_nombre AS nombre FROM CARRERA WHERE plant_cod = ?', [plant_cod]);
        plantilla["carreras"] = carreras;

        for (let carrera of plantilla["carreras"])
        {
            const [cursos] = await promisePool.query('SELECT curso_cod AS codigo, curso_nombre AS nombre FROM CURSO WHERE carre_cod = ?', [carrera["codigo"]]);
            carrera["cursos"] = cursos;
        }
        
        // Obtenemos las aulas y los profesores de la plantilla
        const { aulas } = await AulaModel.getByPlantilla({ plant_cod });
        plantilla["aulas"] = aulas;

        const { profesores } = await ProfesorModel.getByPlantilla({ plant_cod });
        plantilla["profesores"] = profesores;

        return { plantilla, exists: true };
    }

    /**
     * Elimina todos los horarios de una plantilla dada.
     * 
     * @param {Object} param0 - Objeto con el código de la plantilla.
     * @param {string} param0.plant_cod - Código de la plantilla.
     * @returns {Promise} - Promesa que se resuelve cuando los horarios son eliminados.
     */
    static async deleteHorarios({ plant_cod })
    {
        // Eliminamos todos los horarios de la plantilla
        await HorarioModel.deleteByPlantilla({ plant_cod });
    }
}
