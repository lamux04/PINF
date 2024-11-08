import { promisePool } from "../db.js"

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
}