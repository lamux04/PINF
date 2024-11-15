import { promisePool } from "../db.js"
import { v4 } from 'uuid'

export class ProfesorModel
{
    // Precondicion: La plantilla existe
    // Postcondicion: Devuelve un array con los profesores de dicha plantilla
    static async getByPlantilla({ plant_cod })
    {
        // Seleccionamos todos los profesores de la plantilla
        const [rows] = await promisePool.query('SELECT prof_cod AS codigo, prof_nombre AS nombre, CONCAT(prof_apell1, " ", prof_apell2) AS apellidos FROM PROFESOR WHERE plant_cod = ?', [plant_cod])
        
        return { profesores: rows }
    }

    // Precondicion: Ninguna
    // Postcondicion: Devuelve true si el profesor existe, false en caso contrario
    static async existe({ prof_cod, plant_cod })
    {
        // Comprobamos si el profesor existe
        const [rows] = await promisePool.query('SELECT COUNT(*) AS valida FROM PROFESOR WHERE prof_cod = ? AND plant_cod = ?', [prof_cod, plant_cod])

        const { valida } = rows[0]

        return { valida: valida === 1 }
    }

    // Precondicion: El profesor existe
    // Postcondicion: Devuelve un objeto con los datos del profesor
    static async getByCodigo({ prof_cod })
    {
        // Seleccionamos el profesor
        const [rows] = await promisePool.query('SELECT prof_cod AS codigo, prof_nombre AS nombre, CONCAT(prof_apell1, " ", prof_apell2) apellidos FROM PROFESOR WHERE prof_cod = ?', [prof_cod])

        return { profesor: rows[0] }
    }

    // Precondicion: Ninguna
    // Postcondicion: Devuelve true si el profesor pertenece al usuario, false en caso contrario
    static async perteneceAUsuario({ prof_cod, username })
    {
        // Comprobamos si el profesor pertenece al usuario
        const [rows] = await promisePool.query('SELECT PLANTILLA.plant_cod FROM PROFESOR LEFT JOIN PLANTILLA ON PROFESOR.plant_cod = PLANTILLA.plant_cod WHERE PROFESOR.prof_cod = ? AND usu_username = ?', [prof_cod, username])

        if (rows.length === 0) return { valida: false }

        return { valida: true, plant_cod: rows[0]['plant_cod'] }
    }

    // Precondicion: Ninguna
    // Postcondicion: Crea un nuevo profesor
    static async create({ plant_cod, prof_nombre, prof_apell1, prof_apell2 })
    {
        const prof_cod = v4()
        // Creamos el profesor
        const [rows] = await promisePool.query('INSERT INTO PROFESOR (prof_cod, plant_cod, prof_nombre, prof_apell1, prof_apell2) VALUES (?, ?, ?, ?, ?)', [prof_cod, plant_cod, prof_nombre, prof_apell1, prof_apell2])
        
        return { prof_cod }
    }

    // Precondicion: El profesor existe
    // Postcondicion: Actualiza los datos del profesor
    static async update({ prof_cod, prof_nombre, prof_apell1, prof_apell2 })
    {
        // Actualizamos el profesor
        await promisePool.query('UPDATE PROFESOR SET prof_nombre = ?, prof_apell1 = ?, prof_apell2 = ? WHERE prof_cod = ?', [prof_nombre, prof_apell1, prof_apell2, prof_cod])
    }

    // Precondicion: El profesor existe
    // Postcondicion: Elimina el profesor
    static async delete({ prof_cod })
    {
        // Eliminamos el profesor
        await promisePool.query('DELETE FROM PROFESOR WHERE prof_cod = ?', [prof_cod])
    }
}