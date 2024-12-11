import { promisePool } from "../db.js"
import { ClaseModel } from "./clase.js"
import { PlantillaModel } from "./plantilla.js"

import { v4 } from 'uuid'

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

        // for (let carrera of plantilla["carreras"])
        // {
        //     for (let curso of carrera["cursos"])
        //     {
        //         for (let asignatura of curso["asignaturas"])
        //         {
        //             for (let clase of asignatura["clases"])
        //             {
        //                 const { clase_generada, exists } = await ClaseModel.getClaseGenerada({ clase_cod: clase["codigo"], horar_cod: horario["codigo"] })
        //                 if (!exists) continue
        //                 clase["clase_gen_cod"] = clase_generada["codigo"]
        //                 clase["clase_gen_hinicio"] = clase_generada["hinicio"]
        //                 clase["clase_gen_hfin"] = clase_generada["hfin"]
        //                 clase["clase_gen_dia"] = clase_generada["dia"]
        //                 clase["aula"] = clase_generada["aula"]
        //                 // clase["asignatura_cod"] = asignatura["codigo"]
        //                 // clase["asignatura_nombre"] = asignatura["nombre"]
        //                 // clase["curso_cod"] = curso["codigo"]
        //                 // clase["curso_nombre"] = curso["nombre"]
        //                 // clase["carrera_cod"] = carrera["codigo"]
        //                 // clase["carrera_nombre"] = carrera["nombre"]
        //             }
        //         }
        //     }
        //     horario["carreras"].push(carrera)
        // }

        // Lo mismo que lo comentado pero solo con una llamada a la base de datos
        const [clases] = await promisePool.query('SELECT clase_cod AS codigo, clase_gen_cod AS codigo, clase_gen_hinicio AS hinicio, clase_gen_hfin AS hfin, clase_gen_dia AS dia, aula_cod AS aula FROM CLAE_GENERADA WHERE horar_cod = ?', [horar_cod])

        // cambiar clases por un objeto cuyo codigo sea la clave
        const clases_obj = {}
        for (let clase of clases)
        {
            clases_obj[clase["codigo"]] = clase
        }

        console.log(clases_obj)
        for (let carrera of plantilla["carreras"])
        {
            for (let curso of carrera["cursos"])
            {
                for (let asignatura of curso["asignaturas"])
                {
                    for (let clase of asignatura["clases"])
                    {
                        // const { clase_generada, exists } = await ClaseModel.getClaseGenerada({ clase_cod: clase["codigo"], horar_cod: horario["codigo"] })
                        console.log(clase)
                        const clase_generada = clases_obj[clase["codigo"]]
                        clase["clase_gen_cod"] = clase_generada["codigo"]
                        clase["clase_gen_hinicio"] = clase_generada["hinicio"]
                        clase["clase_gen_hfin"] = clase_generada["hfin"]
                        clase["clase_gen_dia"] = clase_generada["dia"]
                        clase["aula"] = clase_generada["aula"]
                        // clase["asignatura_cod"] = asignatura["codigo"]
                        // clase["asignatura_nombre"] = asignatura["nombre"]
                        // clase["curso_cod"] = curso["codigo"]
                        // clase["curso_nombre"] = curso["nombre"]
                        // clase["carrera_cod"] = carrera["codigo"]
                        // clase["carrera_nombre"] = carrera["nombre"]
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

    // Precondicion: El horario existe
    // Postcondicion: Elimina el horario de los horarios que ve el usuario
    static async deleteVisualizador({ horar_cod, username })
    {
        await promisePool.query('DELETE FROM USUARIOVEHORARIO WHERE horar_cod = ? AND usu_cod = ?', [horar_cod, username])
    }

    // Precondicion: El horario existe
    // Postcondicion: Devuelve el nombre del horario
    static async getNombre({ horar_cod })
    {
        const [rows] = await promisePool.query('SELECT horar_nombre AS nombre FROM HORARIO WHERE horar_cod = ?', [horar_cod])

        return { nombre: rows[0]["nombre"] }
    }

    // Precondicion: Existe la plantilla
    // Postcondicion: Crea un horario con la plantilla dada
    static async create({ plant_cod, nombre })
    {
        const horar_cod = v4()
        const [rows] = await promisePool.query('INSERT INTO HORARIO (horar_cod, horar_nombre, plant_cod) VALUES (?, ?, ?)', [horar_cod, nombre, plant_cod])

        return { horar_cod, nombre }
    }

    // Precondicion: Existe la plantilla
    // Postcondicion: Devuelve los datos necesarios para generar el horario
    static async getDatos({ plant_cod })
    {
        const datos = {}

        // Obtenemos las aulas
        const aulas = {}
        const [rows] = await promisePool.query('SELECT aula_cod, aula_tipo FROM AULA WHERE plant_cod = ?', [plant_cod])

        for (let aula of rows)
        {
            if (!aulas[aula["aula_tipo"]])
            {
                aulas[aula["aula_tipo"]] = [aula["aula_cod"]]
            } else
            {
                aulas[aula["aula_tipo"]].push(aula["aula_cod"])
            }
        }
        datos["aulas"] = aulas

        // Obtenemos los profesores
        const profesores = []
        const [rows2] = await promisePool.query('SELECT prof_cod FROM PROFESOR WHERE plant_cod = ?', [plant_cod])

        for (let profesor of rows2)
        {
            profesores.push(profesor["prof_cod"])
        }
        datos["profesores"] = profesores

        // Obtenemos las carreras
        const carreras = []
        const [rows3] = await promisePool.query('SELECT carre_cod AS nombre FROM CARRERA WHERE plant_cod = ?', [plant_cod])

        for (let carrera of rows3)
        {
            // Obtenemos los cursos
            const cursos = []
            const [rows4] = await promisePool.query('SELECT curso_cod AS nombre FROM CURSO WHERE carre_cod = ?', [carrera["nombre"]])

            let c = 1
            for (let curso of rows4)
            {
                curso["nombre"] = `${c}º${curso["nombre"]}`
                // Obtenemos las asignaturas
                const asignaturas = []
                const [rows5] = await promisePool.query('SELECT asig_cod AS nombre, asig_probabilidad AS aprobable FROM ASIGNATURA WHERE curso_cod = ?', [curso["nombre"]])

                for (let asignatura of rows5)
                {
                    if (asignatura["aprobable"] == 1)
                        asignatura["aprobable"] = "SI"
                    else
                        asignatura["aprobable"] = "NO"

                    // Obtenemos las clases
                    const clases = []
                    const [rows6] = await promisePool.query('SELECT clase_cod AS nombre, clase_tipo_aula AS tipo_aula, clase_tipo AS tipo, clase_duracion AS duracion, clase_importante AS importante, prof_cod AS profesor FROM CLASE WHERE asig_cod = ?', [asignatura["nombre"]])

                    for (let clase of rows6)
                    {
                        if (clase["importante"] == 1)
                            clase["importante"] = "SI"
                        else
                            clase["importante"] = "NO"
                        clases.push(clase)
                        
                    }

                    asignatura["clases"] = clases
                    asignaturas.push(asignatura)
                }

                curso["asignaturas"] = asignaturas
                cursos.push(curso)
            }

            carrera["cursos"] = cursos
            carreras.push(carrera)
        }

        datos["carrera"] = carreras

        return { datos }
    }

    // Precondicion: Existe el horario
    // Postcondicion: Guarda el horario en la base de datos
    static async saveData({ horar_cod, data })
    {
        const { carrera: carreras } = data

        for (let carrera of carreras)
        {
            for (let curso of carrera["cursos"])
            {
                let d = 0
                for (let dia of carrera["clases"])
                {
                    for (let lista of dia)
                    {
                        if (typeof lista === 'object')
                        {
                            const clase_gen_cod = v4()
                            promisePool.query('INSERT INTO CLAE_GENERADA (clase_gen_cod, clase_gen_hinicio, clase_gen_hfin, clase_gen_dia, clase_cod, aula_cod, horar_cod) VALUES (?, ?, ?, ?, ?, ?, ?)', [clase_gen_cod, lista["h_ini"], lista["h_fin"], d, lista["nombre"], lista["aula"], horar_cod])
                        }
                        for (let clase of lista)
                        {
                            const clase_gen_cod = v4()
                            promisePool.query('INSERT INTO CLAE_GENERADA (clase_gen_cod, clase_gen_hinicio, clase_gen_hfin, clase_gen_dia, clase_cod, aula_cod, horar_cod) VALUES (?, ?, ?, ?, ?, ?, ?)', [clase_gen_cod, clase["h_ini"], clase["h_fin"], d, clase["nombre"], clase["aula"], horar_cod])
                        }
                    }
                    d++
                }
            }
        }
    }

    // Precondicion: Existe la plantilla
    // Postcondicion: Devuelve el código y nombre de los horarios generados a partir de una plantilla
    static async getHorariosGenerados({ plant_cod })
    {
        const [rows] = await promisePool.query('SELECT horar_cod AS codigo, horar_nombre AS nombre FROM HORARIO WHERE plant_cod = ?', [plant_cod])

        return { horarios: rows }
    }


}