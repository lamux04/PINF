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

    // Precondicion: Existe el curso
    // Postcondicion: Devuelve el curso
    static async getByCodigo({ curso_cod })
    {
        const [rows] = await promisePool.query('SELECT curso_cod AS codigo, curso_nombre AS nombre FROM CURSO WHERE curso_cod = ?', [curso_cod])

        const curso = rows[0]

        // Obtenemos todas las asignaturas de los cursos
        const { asignaturas } = await AsignaturaModel.getByCurso({ curso_cod })
        curso["asignaturas"] = asignaturas

        return { curso }
    }

    // Precondicion: Ninguna
    // Postcondicion: Comprueba si el usuario tiene acceso al curso
    static async perteneceAUsuario({ curso_cod, username })
    {
        const [rows] = await promisePool.query('SELECT * FROM CURSO CARRERA ca, CURSO cu, PLANTILLA p WHERE ca.carre_cod = cu.carre_cod AND ca.plant_cod = p.plant_cod AND cu.curso_cod = ? AND p.usu_username = ?', [curso_cod, username])

        return { valida: rows.length > 0 }
    }

    // Precondicion: Ninguna
    // Postcondicion: Crea un curso con los datos dados
    static async create({ carre_cod, nombre })
    {
        const curso_cod = v4()
        const [rows] = await promisePool.query('INSERT INTO CURSO (curso_cod, carre_cod, curso_nombre) VALUES (?, ?, ?)', [curso_cod, carre_cod, nombre])

        return { curso_cod, carre_cod, nombre }
    }

    
}