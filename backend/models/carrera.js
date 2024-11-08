import { promisePool } from "../db.js";
import { CursoModel } from "./curso.js";

export class CarreraModel
{
    // Precondicion: La plantilla existe
    // Postcondicion: Devuelve un array con todas las carreras de dicha plantilla
    static async getByPlantilla({ plant_cod })
    {
        const [rows] = await promisePool.query('SELECT carre_cod AS codigo, carre_nombre AS nombre FROM CARRERA WHERE plant_cod = ?', [plant_cod])

        const carreras = []

        for (let row of rows)
        {
            // Obtenemos todos los cursos de las carreras
            const { cursos } = await CursoModel.getByCarrera({ carre_cod: row["codigo"] })
            row["cursos"] = cursos

            carreras.push(row)
        }

        return { carreras }
    }
}