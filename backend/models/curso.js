import { promisePool } from "../db.js"
import { AsignaturaModel } from "./asignatura.js"

export class CursoModel
{
    // Precondicion: Existe la carrera
    // Postcondicion: Devuelve una lista de cursos de dicha carrera
    static async getByCarrera({ carre_cod })
    {
        const [rows] = await promisePool.query('SELECT curso_cod AS codigo, curso_nombre AS nombre FROM CURSO WHERE carre_cod = ?', [carre_cod])

        const cursos = []

        for (let row of rows)
        {
            // Obtenemos todas las asignaturas de los cursos
            const { asignaturas } = await AsignaturaModel.getByCurso({ curso_cod: row["codigo"] })
            row["asignaturas"] = asignaturas

            cursos.push(row)
        }

        return { cursos }
    }
}