import { promisePool } from "../db.js"
import { ClaseModel } from "./clase.js"
import { PlantillaModel } from "./plantilla.js"

export class HorarioModel
{   
    // Precondicion: Existe la plantilla
    // Postcondicion: Devuelve un array con los horarios creados con dicha plantilla
    static async getByPlantilla({ plant_cod })
    {
        const [rows] = await promisePool.query('SELECT horar_cod AS codigo, horar_nombre AS nombre FROM HORARIO WHERE plant_cod = ?', [plant_cod])
        
        return { horarios: rows }
    }

    // Precondicion: Existe el horario
    // Postcondicion: Devuelve el horario con el codigo dado
    static async getByCodigo({ horar_cod })
    {
        const [rows] = await promisePool.query('SELECT horar_cod AS codigo, horar_nombre AS nombre, plant_cod FROM HORARIO WHERE horar_cod = ?', [horar_cod])

        if (rows.length == 0) return { horario: null, exists: false }

        let horario = rows[0]

        const { plantilla } = await PlantillaModel.getByCodigo({ plant_cod: horario["plant_cod"] })

        horario["carreras"] = []

        for (let carrera of plantilla["carreras"])
        {
            for (let curso of carrera["cursos"])
            {
                for (let asignatura of curso["asignaturas"])
                {
                    for (let clase of asignatura["clases"])
                    {
                        const { clase_generada, exists } = await ClaseModel.getClaseGenerada({ clase_cod: clase["codigo"], horar_cod: horario["codigo"] })
                        if (!exists) continue
                        clase["clase_gen_cod"] = clase_generada["codigo"]
                        clase["clase_gen_hinicio"] = clase_generada["hinicio"]
                        clase["clase_gen_hfin"] = clase_generada["hfin"]
                        clase["clase_gen_dia"] = clase_generada["dia"]
                        clase["aula_cod"] = clase_generada["aula_cod"]
                        clase["asignatura_cod"] = asignatura["codigo"]
                        clase["asignatura_nombre"] = asignatura["nombre"]
                        clase["curso_cod"] = curso["codigo"]
                        clase["curso_nombre"] = curso["nombre"]
                        clase["carrera_cod"] = carrera["codigo"]
                        clase["carrera_nombre"] = carrera["nombre"]
                    }
                }
            }
            horario["carreras"].push(carrera)
        }

        return { horario, exists: rows.length > 0 }
    }

    // Precondicion: Existe el horario
    // Postcondicion: Devuelve si el horario pertenece al usuario
    static async perteneceAUsuario({ horar_cod, username })
    {
        const [rows] = await promisePool.query('SELECT * FROM HORARIO LEFT JOIN PLANTILLA ON HORARIO.plant_cod = PLANTILLA.plant_cod WHERE HORARIO.horar_cod = ? AND usu_username = ?', [horar_cod, username])

        return { valido: rows.length > 0 }
    }

    // Precondicion: Existe el horario
    // Postcondicion: Devuelve un array con los horarios que ve el usuario
    static async getHorariosQueVeUsuario({ username })
    {
        const [rows] = await promisePool.query('SELECT HORARIO.horar_cod AS codigo, horar_nombre AS nombre FROM USUARIOVEHORARIO LEFT JOIN HORARIO ON USUARIOVEHORARIO.horar_cod = HORARIO.horar_cod WHERE usu_cod = ?', [username])

        return { horarios: rows }
    }

    // Precondicion: Existe el horario
    // Postcondicion: Elimina el horario con el codigo dado
    static async deleteByCodigo({ horar_cod })
    {
        await promisePool.query('DELETE FROM HORARIO WHERE horar_cod = ?', [horar_cod])
    }

    // Precondicion: Existe la plantilla
    // Postcondicion: Elimina todos los horarios de una plantilla
    static async deleteByPlantilla({ plant_cod })
    {
        await promisePool.query('DELETE FROM HORARIO WHERE plant_cod = ?', [plant_cod])
    }

    // Precondicion: Ninguna
    // Postcondicion: Comprobamos si el horario es visible para el usuario
    static async puedeVer({ horar_cod, username })
    {
        const [rows] = await promisePool.query('SELECT * FROM USUARIOVEHORARIO WHERE horar_cod = ? AND usu_cod = ?', [horar_cod, username])

        return { valido: rows.length > 0 }
    }

    // Precondicion: Ninguna
    // Postcondicion: Devuelve true si el horario existe
    static async existe({ horar_cod })
    {
        const [rows] = await promisePool.query('SELECT * FROM HORARIO WHERE horar_cod = ?', [horar_cod])

        return { exists: rows.length > 0 }
    }

    // Precondicion: El horario existe
    // Postcondicion: Añade el horario a los horarios que ve el usuario
    static async addVisualizador({ horar_cod, username })
    {
        await promisePool.query('INSERT INTO USUARIOVEHORARIO VALUES (?, ?)', [username, horar_cod])
    }
}