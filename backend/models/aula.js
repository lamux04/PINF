import { promisePool } from "../db.js"
import { v4 } from 'uuid'

export class AulaModel
{
    // Precondicion: La plantilla existe
    // Postcondicion: Devuelve un array con todas las aulas pertenecientes a dicha plantilla
    static async getByPlantilla({ plant_cod })
    {
        // Seleccionamos todas las aulas de la plantilla
        const [rows] = await promisePool.query('SELECT aula_cod AS codigo, aula_nombre AS nombre, aula_tipo AS tipo FROM AULA WHERE plant_cod = ?', [plant_cod])

        return { aulas: rows }
    }

    // Precondicion: La aula existe
    // Postcondicion: Devuelve el aula con el codigo proporcionado
    static async getByCodigo({ aula_cod })
    {
        // Seleccionamos el aula
        const [rows] = await promisePool.query('SELECT aula_cod AS codigo, aula_nombre AS nombre, aula_tipo AS tipo FROM AULA WHERE aula_cod = ?', [aula_cod])

        return { aula: rows[0] }
    }

    // Precondicion: Ninguna
    // Postcondicion: Devuelve true si el aula pertenece al usuario, false en caso contrario
    static async perteneceAUsuario({ aula_cod, username })
    {
        // Comprobamos que el aula sea del usuario
        const [rows] = await promisePool.query('SELECT PLANTILLA.plant_cod FROM AULA LEFT JOIN PLANTILLA ON AULA.plant_cod = PLANTILLA.plant_cod WHERE AULA.aula_cod = ? AND PLANTILLA.usu_username = ?', [aula_cod, username])

        if (rows.length === 0) return { valida: false }

        return { valida: true, plant_cod: rows[0]['plant_cod'] }
    }

    // Precondicion: Ninguna
    // Postcondicion: Crea un aula y devuelve su codigo
    static async create({ plant_cod, aula_nombre, aula_tipo })
    {
        const aula_cod = v4()
        // Creamos el aula
        const [rows] = await promisePool.query('INSERT INTO AULA (aula_cod, plant_cod, aula_nombre, aula_tipo) VALUES (?, ?, ?, ?)', [aula_cod, plant_cod, aula_nombre, aula_tipo])

        return { aula_cod }
    }

    // Precondicion: El aula existe
    // Postcondicion: Edita el aula con el codigo proporcionado
    static async update({ aula_cod, aula_nombre, aula_tipo })
    {
        // Actualizamos el aula
        await promisePool.query('UPDATE AULA SET aula_nombre = ?, aula_tipo = ? WHERE aula_cod = ?', [aula_nombre, aula_tipo, aula_cod])
    }

    // Precondicion: El aula existe
    // Postcondicion: Elimina el aula con el codigo proporcionado
    static async delete({ aula_cod })
    {
        // Eliminamos el aula
        await promisePool.query('DELETE FROM AULA WHERE aula_cod = ?', [aula_cod])
    }
}