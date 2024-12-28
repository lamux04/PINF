import { promisePool } from "../db.js"
import { ClaseModel } from "./clase.js"
import { PlantillaModel } from "./plantilla.js"

import { v4 } from 'uuid'

export class HorarioModel
{   
    /**
     * Obtiene todos los horarios asociados a una plantilla específica.
     * 
     * @param {Object} param0 - Objeto con el código de la plantilla.
     * @param {string} param0.plant_cod - Código de la plantilla.
     * @returns {Promise} - Promesa que se resuelve con un objeto que contiene un array de horarios asociados a la plantilla.
     */
    static async getByPlantilla({ plant_cod })
    {
        const [rows] = await promisePool.query('SELECT horar_cod AS codigo, horar_nombre AS nombre FROM HORARIO WHERE plant_cod = ?', [plant_cod])
        
        return { horarios: rows }
    }

    /**
     * Obtiene los detalles de un horario específico mediante su código.
     * 
     * @param {Object} param0 - Objeto con el código del horario.
     * @param {string} param0.horar_cod - Código del horario.
     * @returns {Promise} - Promesa que se resuelve con el objeto horario, si existe, junto con su información de clases y carrera.
     */
    static async getByCodigo({ horar_cod })
    {
        const [rows] = await promisePool.query('SELECT horar_cod AS codigo, horar_nombre AS nombre, plant_cod, horar_h_ini h_ini, horar_h_fin h_fin FROM HORARIO WHERE horar_cod = ?', [horar_cod])

        if (rows.length == 0) return { horario: null, exists: false }

        let horario = rows[0]

        // Se obtiene la plantilla asociada al horario
        const { plantilla } = await PlantillaModel.getByCodigo({ plant_cod: horario["plant_cod"] })

        horario["carreras"] = []

        // Obtenemos las clases generadas para el horario y asociamos a cada clase sus detalles
        const [clases] = await promisePool.query('SELECT clase_cod AS codigo, clase_gen_cod AS codigo, clase_gen_hinicio AS hinicio, clase_gen_hfin AS hfin, clase_gen_dia AS dia, AULA.aula_nombre AS aula, clase_cod FROM CLAE_GENERADA INNER JOIN AULA ON AULA.aula_cod = CLAE_GENERADA.aula_cod WHERE horar_cod = ?', [horar_cod])

        const clases_obj = {}
        for (let clase of clases)
        {
            clases_obj[clase["clase_cod"]] = clase
        }

        // Asociamos las clases generadas a las asignaturas de la plantilla
        for (let carrera of plantilla["carreras"])
        {
            for (let curso of carrera["cursos"])
            {
                for (let asignatura of curso["asignaturas"])
                {
                    for (let clase of asignatura["clases"])
                    {
                        const clase_generada = clases_obj[clase["codigo"]]
                        if (!clase_generada) continue
                        clase["clase_gen_cod"] = clase_generada["codigo"]
                        clase["clase_gen_hinicio"] = clase_generada["hinicio"]
                        clase["clase_gen_hfin"] = clase_generada["hfin"]
                        clase["clase_gen_dia"] = clase_generada["dia"]
                        clase["aula"] = clase_generada["aula"]
                    }
                }
            }
            horario["carreras"].push(carrera)
        }
        
        return { horario, exists: rows.length > 0 }
    }

    /**
     * Verifica si un horario específico pertenece a un usuario dado.
     * 
     * @param {Object} param0 - Objeto con el código del horario y el nombre de usuario.
     * @param {string} param0.horar_cod - Código del horario.
     * @param {string} param0.username - Nombre de usuario.
     * @returns {Promise} - Promesa que se resuelve con un objeto que contiene un valor booleano que indica si el horario pertenece al usuario.
     */
    static async perteneceAUsuario({ horar_cod, username })
    {
        const [rows] = await promisePool.query('SELECT * FROM HORARIO LEFT JOIN PLANTILLA ON HORARIO.plant_cod = PLANTILLA.plant_cod WHERE HORARIO.horar_cod = ? AND usu_username = ?', [horar_cod, username])

        return { valido: rows.length > 0 }
    }

    /**
     * Obtiene todos los horarios que un usuario tiene acceso a ver.
     * 
     * @param {Object} param0 - Objeto con el nombre de usuario.
     * @param {string} param0.username - Nombre de usuario.
     * @returns {Promise} - Promesa que se resuelve con un objeto que contiene un array de horarios que el usuario puede ver.
     */
    static async getHorariosQueVeUsuario({ username })
    {
        const [rows] = await promisePool.query('SELECT HORARIO.horar_cod AS codigo, horar_nombre AS nombre FROM USUARIOVEHORARIO LEFT JOIN HORARIO ON USUARIOVEHORARIO.horar_cod = HORARIO.horar_cod WHERE usu_cod = ?', [username])

        return { horarios: rows }
    }

    /**
     * Elimina un horario específico mediante su código.
     * 
     * @param {Object} param0 - Objeto con el código del horario.
     * @param {string} param0.horar_cod - Código del horario.
     * @returns {Promise} - Promesa que se resuelve cuando el horario es eliminado.
     */
    static async deleteByCodigo({ horar_cod })
    {
        await promisePool.query('DELETE FROM HORARIO WHERE horar_cod = ?', [horar_cod])
    }

    /**
     * Elimina todos los horarios de una plantilla dada.
     * 
     * @param {Object} param0 - Objeto con el código de la plantilla.
     * @param {string} param0.plant_cod - Código de la plantilla.
     * @returns {Promise} - Promesa que se resuelve cuando los horarios de la plantilla son eliminados.
     */
    static async deleteByPlantilla({ plant_cod })
    {
        await promisePool.query('DELETE FROM HORARIO WHERE plant_cod = ?', [plant_cod])
    }

    /**
     * Verifica si un horario específico puede ser visto por un usuario.
     * 
     * @param {Object} param0 - Objeto con el código del horario y el nombre de usuario.
     * @param {string} param0.horar_cod - Código del horario.
     * @param {string} param0.username - Nombre de usuario.
     * @returns {Promise} - Promesa que se resuelve con un objeto que contiene un valor booleano que indica si el horario es visible para el usuario.
     */
    static async puedeVer({ horar_cod, username })
    {
        const [rows] = await promisePool.query('SELECT * FROM USUARIOVEHORARIO WHERE horar_cod = ? AND usu_cod = ?', [horar_cod, username])

        return { valido: rows.length > 0 }
    }

    /**
     * Comprueba si el horario existe.
     * 
     * @param {Object} param0 - Objeto con el código del horario.
     * @param {string} param0.horar_cod - Código del horario.
     * @returns {Promise} - Promesa que se resuelve con un objeto que indica si el horario existe.
     */
    static async existe({ horar_cod })
    {
        const [rows] = await promisePool.query('SELECT * FROM HORARIO WHERE horar_cod = ?', [horar_cod])

        return { exists: rows.length > 0 }
    }

    /**
     * Añade un horario a los horarios que ve el usuario.
     * 
     * @param {Object} param0 - Objeto con el código del horario y el nombre de usuario.
     * @param {string} param0.horar_cod - Código del horario.
     * @param {string} param0.username - Nombre de usuario.
     * @returns {Promise} - Promesa que se resuelve cuando el horario es añadido.
     */
    static async addVisualizador({ horar_cod, username })
    {
        await promisePool.query('INSERT INTO USUARIOVEHORARIO VALUES (?, ?)', [username, horar_cod])
    }

    /**
     * Elimina un horario de los horarios que ve el usuario.
     * 
     * @param {Object} param0 - Objeto con el código del horario y el nombre de usuario.
     * @param {string} param0.horar_cod - Código del horario.
     * @param {string} param0.username - Nombre de usuario.
     * @returns {Promise} - Promesa que se resuelve cuando el horario es eliminado.
     */
    static async deleteVisualizador({ horar_cod, username })
    {
        await promisePool.query('DELETE FROM USUARIOVEHORARIO WHERE horar_cod = ? AND usu_cod = ?', [horar_cod, username])
    }

    /**
     * Obtiene el nombre del horario con el código dado.
     * 
     * @param {Object} param0 - Objeto con el código del horario.
     * @param {string} param0.horar_cod - Código del horario.
     * @returns {Promise} - Promesa que se resuelve con el nombre del horario.
     */
    static async getNombre({ horar_cod })
    {
        const [rows] = await promisePool.query('SELECT horar_nombre AS nombre FROM HORARIO WHERE horar_cod = ?', [horar_cod])

        return { nombre: rows[0]["nombre"] }
    }

    /**
     * Crea un nuevo horario a partir de una plantilla dada.
     * 
     * @param {Object} param0 - Objeto con el código de la plantilla, el nombre del horario, la hora de inicio y la hora de fin.
     * @param {string} param0.plant_cod - Código de la plantilla.
     * @param {string} param0.nombre - Nombre del horario.
     * @param {string} param0.h_ini - Hora de inicio del horario.
     * @param {string} param0.h_fin - Hora de fin del horario.
     * @returns {Promise} - Promesa que se resuelve con el código y el nombre del horario creado.
     */
    static async create({ plant_cod, nombre, h_ini, h_fin })
    {
        const horar_cod = v4()
        const [rows] = await promisePool.query('INSERT INTO HORARIO (horar_cod, horar_nombre, plant_cod, horar_h_ini, horar_h_fin) VALUES (?, ?, ?, ?, ?)', [horar_cod, nombre, plant_cod, h_ini, h_fin])

        return { horar_cod, nombre }
    }

    /**
     * Obtiene los datos necesarios para generar un horario a partir de una plantilla.
     * 
     * @param {Object} param0 - Objeto con el código de la plantilla.
     * @param {string} param0.plant_cod - Código de la plantilla.
     * @returns {Promise} - Promesa que se resuelve con los datos necesarios para generar el horario.
     */
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
                const codigo_curso = curso["nombre"]
                curso["nombre"] = `${c}º${curso["nombre"]}`
                // Obtenemos las asignaturas
                const asignaturas = []
                const [rows5] = await promisePool.query('SELECT asig_cod AS nombre, asig_probabilidad AS aprobable FROM ASIGNATURA WHERE curso_cod = ?', [codigo_curso])

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

                    if (clases.length == 0) continue
                    asignatura["clases"] = clases
                    asignaturas.push(asignatura)
                }

                if (asignaturas.length == 0) continue
                curso["asignaturas"] = asignaturas
                cursos.push(curso)
                c++;
            }

            if (cursos.length == 0) continue
            carrera["cursos"] = cursos
            carreras.push(carrera)
        }

        datos["carrera"] = carreras

        return { datos }
    }

    /**
     * Guarda los datos del horario en la base de datos.
     * 
     * @param {Object} param0 - Objeto con el código del horario y los datos del horario.
     * @param {string} param0.horar_cod - Código del horario.
     * @param {Object} param0.data - Datos del horario.
     * @returns {Promise} - Promesa que se resuelve cuando los datos son guardados.
     */
    static async saveData({ horar_cod, data })
    {
        const { carrera: carreras } = data

        for (let carrera of carreras)
        {
            for (let curso of carrera["cursos"])
            {
                let d = 0
                for (let dia of curso["clases"])
                {
                    for (let lista of dia)
                    {
                        if (!Array.isArray(lista))
                        {
                            const clase_gen_cod = v4()
                            promisePool.query('INSERT INTO CLAE_GENERADA (clase_gen_cod, clase_gen_hinicio, clase_gen_hfin, clase_gen_dia, clase_cod, aula_cod, horar_cod) VALUES (?, ?, ?, ?, ?, ?, ?)', [clase_gen_cod, lista["h_ini"], lista["h_fin"], d, lista["nombre"], lista["aula"], horar_cod])
                        }
                        else {

                            for (let clase of lista)
                            {
                                const clase_gen_cod = v4()
                                promisePool.query('INSERT INTO CLAE_GENERADA (clase_gen_cod, clase_gen_hinicio, clase_gen_hfin, clase_gen_dia, clase_cod, aula_cod, horar_cod) VALUES (?, ?, ?, ?, ?, ?, ?)', [clase_gen_cod, clase["h_ini"], clase["h_fin"], d, clase["nombre"], clase["aula"], horar_cod])
                            }
                        }
                    }
                    d++
                }
            }
        }
    }

    /**
     * Devuelve el código y nombre de los horarios generados a partir de una plantilla.
     * 
     * @param {Object} param0 - Objeto con el código de la plantilla.
     * @param {string} param0.plant_cod - Código de la plantilla.
     * @returns {Promise} - Promesa que se resuelve con los horarios generados.
     */
    static async getHorariosGenerados({ plant_cod })
    {
        const [rows] = await promisePool.query('SELECT horar_cod AS codigo, horar_nombre AS nombre FROM HORARIO WHERE plant_cod = ?', [plant_cod])

        return { horarios: rows }
    }

}