import { promisePool } from "../db.js";
import { AulaModel } from "./aula.js";
import { CarreraModel } from "./carrera.js";
import { HorarioModel } from "./horario.js";
import { ProfesorModel } from "./profesor.js";

export class PlantillaModel
{
    // Precondicion: El usuario existe
    // Postcondicion: Devuelve un array con todas las plantillas creadas por el usuario
    static async getByUsername({ username })
    {
        // Seleccionamos todas las plantillas del usuario
        const [rows] = await promisePool.query('SELECT plant_cod AS codigo, plant_nombre AS nombre FROM PLANTILLA WHERE usu_username = ?', [username])

        const plantillas = []

        for (let row of rows)
        {
            // Seleccionamos las carreras de dicha plantilla
            const { carreras } = await CarreraModel.getByPlantilla({ plant_cod: row["codigo"] })
            row["carreras"] = carreras

            // Seleccionar los horarios de dicha plantilla
            const { horarios } = await HorarioModel.getByPlantilla({ plant_cod: row["codigo"] })
            row["horarios"] = horarios

            // Seleccionamos las aulas de dicha plantilla
            const { aulas } = await AulaModel.getByPlantilla({ plant_cod: row["codigo"] })
            row["aulas"] = aulas

            // Seleccionamos los profesores de dicha plantilla
            const { profesores } = await ProfesorModel.getByPlantilla({ plant_cod: row["codigo"] })
            row["profesores"] = profesores

            plantillas.push(row)
        }

        return { plantillas }
    }
}