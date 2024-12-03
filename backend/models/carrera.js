import { CursoModel } from "./curso.js";
import { promisePool } from "../db.js";
import { v4 } from 'uuid'

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

    // Precondicion: La carrera existe
    // Postcondicion: Devuelve la carrera
    static async getByCodigo({ carre_cod })
    {
        const [rows] = await promisePool.query('SELECT carre_cod AS codigo, carre_nombre AS nombre FROM CARRERA WHERE carre_cod = ?', [carre_cod])

        const carrera = rows[0]

        // Obtenemos todos los cursos de las carreras
        const { cursos } = await CursoModel.getByCarrera({ carre_cod })
        carrera["cursos"] = cursos

        return { carrera }
    }

    // Precondicion: Ninguna
    // Postcondicion: Devuelve si la carrera pertenece al usuario
    static async perteneceAUsuario({ carre_cod, username })
    {
        const [rows] = await promisePool.query('SELECT * FROM CARRERA c LEFT JOIN PLANTILLA p ON c.plant_cod = p.plant_cod WHERE p.usu_username = ? AND c.carre_cod = ?', [username, carre_cod])

        return( { valida: rows.length > 0 } )
    }

    // Precondicion: La plantilla existe
    // Postcondicion: Crea una carrera con los datos dados
    static async create({ plant_cod, carre_nombre })
    {
        const carre_cod = v4()
        const [rows] = await promisePool.query('INSERT INTO CARRERA (carre_cod, plant_cod, carre_nombre) VALUES (?, ?, ?)', [carre_cod, plant_cod, carre_nombre])

        return( { carre_cod, plant_cod, carre_nombre } )
    }

    // Precondicion: La carrera existe
    // Postcondicion: Actualiza la carrera con los datos dados
    static async update({ carre_cod, carre_nombre })
    {
        const [rows] = await promisePool.query('UPDATE CARRERA SET carre_nombre = ? WHERE carre_cod = ?', [carre_nombre, carre_cod])

        return( { carre_cod, carre_nombre } )
    }

    // Precondicion: La carrera existe
    // Postcondicion: Elimina la carrera
    static async delete({ carre_cod })
    {
        const [rows] = await promisePool.query('DELETE FROM CARRERA WHERE carre_cod = ?', [carre_cod])

        return( { carre_cod } )
    }

    // Precondicion: La carrera existe
    // Postcondicion: Devuelve el codigo de la plantilla de la carrera
    static async getPlantilla({ carre_cod })
    {
        const [rows] = await promisePool.query('SELECT plant_cod FROM CARRERA WHERE carre_cod = ?', [carre_cod])

        return( { plant_cod: rows[0]["plant_cod"] } )
    }

    // Precondicion: Ninguna
    // Postcondicion: Devuelve la carrera sin los cursos
    static async getSoloCarrera({ carre_cod })
    {
        const [rows] = await promisePool.query('SELECT carre_cod, carre_nombre FROM CARRERA WHERE carre_cod = ?', [carre_cod])

        if (rows.length === 0)
        {
            return( { exists: false } )
        }

        return( { exists: rows.length > 0, carre_cod, carre_nombre: rows[0]["carre_nombre"] } )
    }

    // Precondicion: Ninguna
    // Postcondicion: Devuelve los cursos perteneciente a una carrera
    static async getCursos({ carre_cod })
    {
        const [rows] = await promisePool.query('SELECT curso_cod codigo, curso_nombre nombre FROM CARRERA LEFT JOIN CURSO ON CARRERA.carre_cod = CURSO.carre_cod WHERE CARRERA.carre_cod = ?', [carre_cod])

        return({ cursos: rows })
    }
}