import { promisePool } from "../db.js"
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
    static async getByCodigo({ hor_cod })
    {
        const [rows] = await promisePool.query('SELECT horar_cod AS codigo, horar_nombre AS nombre, plant_cod FROM HORARIO WHERE horar_cod = ?', [hor_cod])

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
                        const { clase_generada } = await ClaseGeneradaModel.getByCodigo({ clase_cod: clase["codigo"], hor_cod: horario["codigo"] })
                        clase["clase_gen_cod"] = clase_generada["codigo"]
                        clase["clase_gen_hinicio"] = clase_generada["hinicio"]
                        clase["clase_gen_hfin"] = clase_generada["hfin"]
                        clase["clase_gen_dia"] = clase_generada["dia"]
                        clase["aula_cod"] = clase_generada["aula_cod"]
                    }
                }
            }
            horario["carreras"].push(carrera)
        }

        return { horario, exists: rows.length > 0 }
    }

    // Precondicion: Existe el horario
    // Postcondicion: Devuelve si el horario pertenece al usuario
    static async perteneceAUsuario({ hor_cod, username })
    {
        const [rows] = await promisePool.query('SELECT * FROM HORARIO WHERE horar_cod = ? AND username = ?', [hor_cod, username])

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
    static async puedeVer({ hor_cod, username })
    {
        const [rows] = await promisePool.query('SELECT * FROM USUARIOVEHORARIO WHERE horar_cod = ? AND usu_cod = ?', [hor_cod, username])

        return { valido: rows.length > 0 }
    }
}