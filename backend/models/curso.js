import { promisePool } from "../db.js"
import { AsignaturaModel } from "./asignatura.js"
import { v4 } from 'uuid'

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
        const [rows] = await promisePool.query('SELECT * FROM CARRERA ca, CURSO cu, PLANTILLA p WHERE ca.carre_cod = cu.carre_cod AND ca.plant_cod = p.plant_cod AND cu.curso_cod = ? AND p.usu_username = ?', [curso_cod, username])

        return { valida: rows.length > 0 }
    }

    // Precondicion: Ninguna
    // Postcondicion: Crea un curso con los datos dados
    static async create({ carre_cod, carre_nombre })
    {
        const curso_cod = v4()
        const [rows] = await promisePool.query('INSERT INTO CURSO (curso_cod, carre_cod, curso_nombre) VALUES (?, ?, ?)', [curso_cod, carre_cod, carre_nombre])

        return { curso_cod, carre_cod, carre_nombre }
    }

    // Precondicion: Ninguna
    // Postcondicion: Actualiza el curso con los datos dados
    static async update({ curso_cod, curso_nombre })
    {
        await promisePool.query('UPDATE CURSO SET curso_nombre = ? WHERE curso_cod = ?', [curso_nombre, curso_cod])
    }

    // Precondicion: Existe el curso
    // Postcondicion: Elimina el curso con el codigo dado
    static async delete({ curso_cod })
    {
        await promisePool.query('DELETE FROM CURSO WHERE curso_cod = ?', [curso_cod])
    }

    // Precondicion: Existe el curso
    // Postcondicion: Devuelve solo el nombre y el codigo del curso
    static async getSoloCurso({ curso_cod })
    {
        const [rows] = await promisePool.query('SELECT curso_cod, curso_nombre FROM CURSO WHERE curso_cod = ?', [curso_cod])

        if (rows.length == 0)
            return { exists: false }

        return { exists: true, curso_cod, curso_nombre: rows[0]["curso_nombre"] }
    }

    // Precondicion: Existe el curso
    // Postcondicion: Devuelve el codigo de la plantilla del curso
    static async getPlantilla({ curso_cod })
    {
        const [rows] = await promisePool.query('SELECT p.plant_cod FROM CURSO cu, CARRERA ca, PLANTILLA p WHERE cu.carre_cod = ca.carre_cod AND ca.plant_cod = p.plant_cod AND cu.curso_cod = ?', [curso_cod])

        return { plant_cod: rows[0]["plant_cod"] }
    }
}