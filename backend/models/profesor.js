import { promisePool } from "../db.js"

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
}