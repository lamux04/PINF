import { promisePool } from "../db.js"
import { ClaseModel } from "./clase.js"

export class AsignaturaModel
{
    // Precondicion: Existe el curso
    // Postcondicion: Devuelve una lista de asignaturas de dicho curso
    static async getByCurso({ curso_cod })
    {
        const [rows] = await promisePool.query('SELECT asig_cod AS codigo, asig_nombre AS nombre, asig_probabilidad AS aprobabilidad FROM ASIGNATURA WHERE curso_cod = ?', [curso_cod])

        const asignaturas = []

        for (let row of rows)
        {
            // Obtenemos todas las clases de las asignaturas
            const { clases } = await ClaseModel.getByAsignatura({ asig_cod: row["codigo"] })
            row["clases"] = clases

            asignaturas.push(row)
        }

        return { asignaturas }
    }
}