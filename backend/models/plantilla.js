import { promisePool } from "../db.js";
import { AulaModel } from "./aula.js";
import { CarreraModel } from "./carrera.js";
import { HorarioModel } from "./horario.js";
import { ProfesorModel } from "./profesor.js";
import { v4 } from 'uuid'

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

    // Precondicion: Ninguna
    // Postcondicion: Devuelve la plantilla con el codigo dado
    static async getByCodigo({ plant_cod })
    {
        // Seleccionamos la plantilla con el codigo dado
        const [rows] = await promisePool.query('SELECT plant_cod AS codigo, plant_nombre AS nombre FROM PLANTILLA WHERE plant_cod = ?', [plant_cod])

        if (rows.length === 0) return { exists: false }

        const plantilla = rows[0]

        // Seleccionamos las carreras de dicha plantilla
        const { carreras } = await CarreraModel.getByPlantilla({ plant_cod })
        plantilla["carreras"] = carreras

        // Seleccionar los horarios de dicha plantilla
        const { horarios } = await HorarioModel.getByPlantilla({ plant_cod })
        plantilla["horarios"] = horarios

        // Seleccionamos las aulas de dicha plantilla
        const { aulas } = await AulaModel.getByPlantilla({ plant_cod })
        plantilla["aulas"] = aulas

        // Seleccionamos los profesores de dicha plantilla
        const { profesores } = await ProfesorModel.getByPlantilla({ plant_cod })
        plantilla["profesores"] = profesores

        return { plantilla, exists: true }
    }

    // Precondicion: El usuario existe
    // Postcondicion: Crea una plantilla con el nombre dado
    static async create({ nombre, username })
    {
        const codigo = v4()

        // Creamos la plantilla
        await promisePool.query('INSERT INTO PLANTILLA (plant_cod, plant_nombre, usu_username) VALUES (?, ?, ?)', [codigo, nombre, username])

        return { plant_cod: codigo }
    }

    // Precondicion: La plantilla existe
    // Postcondicion: Devuelve la plantilla con el codigo dado
    static async getSoloPlantillaByCodigo({ plant_cod })
    {
        // Seleccionamos la plantilla con el codigo dado
        const [rows] = await promisePool.query('SELECT plant_cod AS codigo, plant_nombre AS nombre FROM PLANTILLA WHERE plant_cod = ?', [plant_cod])

        if (rows.length === 0) return { exists: false }

        return { plantilla: rows[0], exists: true }
    }

    // Precondicion: Ninguna
    // Postcondicion: Actualiza la plantilla con el codigo dado
    static async update({ plant_cod, nombre })
    {
        // Comprobamos que exista la plantilla
        const { exists } = await PlantillaModel.getSoloPlantillaByCodigo({ plant_cod })
        if (!exists) return { exists: false }

        // Actualizamos la plantilla
        await promisePool.query('UPDATE PLANTILLA SET plant_nombre = ? WHERE plant_cod = ?', [nombre, plant_cod])

        return { exists: true }
    }

    // Precondicion: Ninguna
    // Postcondicion: Borra la plantilla con el codigo dado
    static async delete({ plant_cod })
    {
        // Comprobamos que exista la plantilla
        const { exists } = await PlantillaModel.getSoloPlantillaByCodigo({ plant_cod })
        if (!exists) return { exists: false }

        // Borramos la plantilla
        await promisePool.query('DELETE FROM PLANTILLA WHERE plant_cod = ?', [plant_cod])

        return { exists: true }
    }
}