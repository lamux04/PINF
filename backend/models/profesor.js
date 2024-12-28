import { promisePool } from "../db.js"
import { v4 } from 'uuid'

export class ProfesorModel
{
    /**
     * Devuelve un array con los profesores de una plantilla dada.
     * 
     * @param {Object} param0 - Objeto con el código de la plantilla.
     * @param {string} param0.plant_cod - Código de la plantilla.
     * @returns {Promise} - Promesa que se resuelve con un array de profesores de la plantilla.
     */
    static async getByPlantilla({ plant_cod })
    {
        // Seleccionamos todos los profesores de la plantilla
        const [rows] = await promisePool.query("SELECT prof_cod AS codigo, prof_nombre AS nombre, CONCAT(prof_apell1, ' ', prof_apell2) AS apellidos FROM PROFESOR WHERE plant_cod = ?", [plant_cod])
        
        return { profesores: rows }
    }

    /**
     * Comprueba si un profesor existe en una plantilla dada.
     * 
     * @param {Object} param0 - Objeto con el código del profesor y el código de la plantilla.
     * @param {string} param0.prof_cod - Código del profesor.
     * @param {string} param0.plant_cod - Código de la plantilla.
     * @returns {Promise} - Promesa que se resuelve con un objeto que indica si el profesor existe en la plantilla.
     */
    static async existe({ prof_cod, plant_cod })
    {
        // Comprobamos si el profesor existe
        const [rows] = await promisePool.query('SELECT COUNT(*) AS valida FROM PROFESOR WHERE prof_cod = ? AND plant_cod = ?', [prof_cod, plant_cod])

        const { valida } = rows[0]

        return { valida: valida === 1 }
    }

    /**
     * Devuelve los datos de un profesor dado su código.
     * 
     * @param {Object} param0 - Objeto con el código del profesor.
     * @param {string} param0.prof_cod - Código del profesor.
     * @returns {Promise} - Promesa que se resuelve con los datos del profesor.
     */
    static async getByCodigo({ prof_cod })
    {
        // Seleccionamos el profesor
        const [rows] = await promisePool.query("SELECT prof_cod AS codigo, prof_nombre AS nombre, CONCAT(prof_apell1, ' ', prof_apell2) apellidos FROM PROFESOR WHERE prof_cod = ?", [prof_cod])

        return { profesor: rows[0] }
    }

    /**
     * Comprueba si un profesor pertenece a un usuario dado su código y nombre de usuario.
     * 
     * @param {Object} param0 - Objeto con el código del profesor y el nombre de usuario.
     * @param {string} param0.prof_cod - Código del profesor.
     * @param {string} param0.username - Nombre de usuario.
     * @returns {Promise} - Promesa que se resuelve con un objeto que indica si el profesor pertenece al usuario.
     */
    static async perteneceAUsuario({ prof_cod, username })
    {
        // Comprobamos si el profesor pertenece al usuario
        const [rows] = await promisePool.query('SELECT PLANTILLA.plant_cod FROM PROFESOR LEFT JOIN PLANTILLA ON PROFESOR.plant_cod = PLANTILLA.plant_cod WHERE PROFESOR.prof_cod = ? AND usu_username = ?', [prof_cod, username])

        if (rows.length === 0) return { valida: false }

        return { valida: true, plant_cod: rows[0]['plant_cod'] }
    }

    /**
     * Crea un nuevo profesor en una plantilla dada.
     * 
     * @param {Object} param0 - Objeto con los datos del profesor y el código de la plantilla.
     * @param {string} param0.plant_cod - Código de la plantilla.
     * @param {string} param0.prof_nombre - Nombre del profesor.
     * @param {string} param0.prof_apell1 - Primer apellido del profesor.
     * @param {string} param0.prof_apell2 - Segundo apellido del profesor.
     * @returns {Promise} - Promesa que se resuelve con el código del nuevo profesor.
     */
    static async create({ plant_cod, prof_nombre, prof_apell1, prof_apell2 })
    {
        const prof_cod = v4()
        // Creamos el profesor
        const [rows] = await promisePool.query('INSERT INTO PROFESOR (prof_cod, plant_cod, prof_nombre, prof_apell1, prof_apell2) VALUES (?, ?, ?, ?, ?)', [prof_cod, plant_cod, prof_nombre, prof_apell1, prof_apell2])
        
        return { prof_cod }
    }

    /**
     * Actualiza los datos de un profesor.
     * 
     * @param {Object} param0 - Objeto con el código del profesor y los datos a actualizar.
     * @param {string} param0.prof_cod - Código del profesor.
     * @param {string} param0.prof_nombre - Nuevo nombre del profesor.
     * @param {string} param0.prof_apell1 - Nuevo primer apellido del profesor.
     * @param {string} param0.prof_apell2 - Nuevo segundo apellido del profesor.
     * @returns {Promise} - Promesa que se resuelve cuando los datos son actualizados.
     */
    static async update({ prof_cod, prof_nombre, prof_apell1, prof_apell2 })
    {
        // Actualizamos el profesor
        await promisePool.query('UPDATE PROFESOR SET prof_nombre = ?, prof_apell1 = ?, prof_apell2 = ? WHERE prof_cod = ?', [prof_nombre, prof_apell1, prof_apell2, prof_cod])
    }

    /**
     * Elimina un profesor dado su código.
     * 
     * @param {Object} param0 - Objeto con el código del profesor.
     * @param {string} param0.prof_cod - Código del profesor.
     * @returns {Promise} - Promesa que se resuelve cuando el profesor es eliminado.
     */
    static async delete({ prof_cod })
    {
        // Eliminamos el profesor
        await promisePool.query('DELETE FROM PROFESOR WHERE prof_cod = ?', [prof_cod])
    }
}
