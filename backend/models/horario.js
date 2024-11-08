import { promisePool } from "../db.js"

export class HorarioModel
{   
    // Precondicion: Existe la plantilla
    // Postcondicion: Devuelve un array con los horarios creados con dicha plantilla
    static async getByPlantilla({ plant_cod })
    {
        const [rows] = await promisePool.query('SELECT horar_cod AS codigo, horar_nombre AS nombre FROM HORARIO WHERE plant_cod = ?', [plant_cod])
        
        return { horarios: rows }
    }
}