import { promisePool } from "../db.js"
import { ClaseModel } from "./clase.js"
import { v4 } from 'uuid'

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

    // Precondicion: Ninguna
    // Postcondicion: Devuelve true o false si la asignatura pertenece al usuario
    static async perteneceAUsuario({ asig_cod, username })
    {
        const [rows] = await promisePool.query('SELECT PL.plant_cod FROM ASIGNATURA A, CURSO C, CARRERA CA, PLANTILLA PL WHERE A.curso_cod = C.curso_cod AND C.carre_cod = CA.carre_cod AND PL.plant_cod = CA.plant_cod AND usu_username = ? AND A.asig_cod = ?', [username, asig_cod])

        if (rows.length == 0) return { valida: false }

        return { valida: rows.length > 0, plant_cod: rows[0]["plant_cod"] }
    }

    // Precondicion: Existe la asignatura
    // Postcondicion: Devuelve la asignatura con el codigo dado
    static async getByCodigo({ asig_cod })
    {
        const [rows] = await promisePool.query('SELECT asig_cod AS codigo, asig_nombre AS nombre, asig_probabilidad AS aprobabilidad FROM ASIGNATURA WHERE asig_cod = ?', [asig_cod])

        const asignatura = rows[0]

        // Obtenemos todas las clases de las asignaturas
        const { clases } = await ClaseModel.getByAsignatura({ asig_cod })
        asignatura["clases"] = clases

        return { asignatura }
    }

    // Precondicion: Ninguna
    // Postcondicion: Crea una asignatura
    static async create({ asig_nombre, asig_aprobabilidad, curso_cod })
    {
        const asig_cod = v4();
        const [rows] = await promisePool.query('INSERT INTO ASIGNATURA (asig_nombre, asig_probabilidad, curso_cod, asig_cod) VALUES (?, ?, ?, ?)', [asig_nombre, asig_aprobabilidad, curso_cod, asig_cod])

        return { asig_cod }
    }

    // Precondicion: Existe la asignatura
    // Postcondicion: Devuelve solo la asignatura sin las clases
    static async getSoloAsignatura({ asig_cod })
    {
        const [rows] = await promisePool.query('SELECT asig_cod AS codigo, asig_nombre AS nombre, asig_probabilidad AS aprobabilidad FROM ASIGNATURA WHERE asig_cod = ?', [asig_cod])

        return { asig_cod, asig_nombre: rows[0]["nombre"], asig_aprobabilidad: rows[0]["aprobabilidad"] }
    }

    // Precondicion: Existe la asignatura
    // Postcondicion: Actualiza la asignatura
    static async update({ asig_cod, asig_nombre, asig_aprobabilidad })
    {
        await promisePool.query('UPDATE ASIGNATURA SET asig_nombre = ?, asig_probabilidad = ? WHERE asig_cod = ?', [asig_nombre, asig_aprobabilidad, asig_cod])

        return { asig_cod, asig_nombre, asig_aprobabilidad }
    }

    // Precondicion: Ninguna
    // Postcondicion: Elimina la asignatura
    static async delete({ asig_cod })
    {
        await promisePool.query('DELETE FROM ASIGNATURA WHERE asig_cod = ?', [asig_cod])

        return { asig_cod }
    }
}