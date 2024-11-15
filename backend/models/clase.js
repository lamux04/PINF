import { promisePool } from "../db.js";
import { v4 } from 'uuid';

export class ClaseModel
{
    // Precondicion: La asignatura existe
    // Postcondicion: Devuelve un array con las clases de dicha asignatura
    static async getByAsignatura({ asig_cod })
    {
        const [rows] = await promisePool.query('SELECT clase_cod AS codigo, clase_descrip AS descripcion, clase_tipo AS tipo, clase_duracion AS duracion, clase_tipo_aula AS "tipo aula", CLASE.prof_cod AS "profesor codigo", CONCAT(prof_nombre, " ", prof_apell1, " ", prof_apell2) AS "profesor nombre" FROM CLASE LEFT JOIN PROFESOR ON CLASE.prof_cod = PROFESOR.prof_cod WHERE asig_cod = ?', [asig_cod])

        const clases = rows

        return { clases }
    }

    // Precondicion: La clase existe
    // Postcondicion: Devuelve la clase
    static async getByCodigo({ clase_cod })
    {
        const [rows] = await promisePool.query('SELECT clase_cod AS codigo, clase_descrip AS descripcion, clase_tipo AS tipo, clase_duracion AS duracion, clase_tipo_aula AS "tipo aula", CLASE.prof_cod AS "codigo profesor", CONCAT(prof_nombre, " ", prof_apell1, " ", prof_apell2) AS "profesor nombre" FROM CLASE LEFT JOIN PROFESOR ON CLASE.prof_cod = PROFESOR.prof_cod WHERE clase_cod = ?', [clase_cod])

        const clase = rows[0]

        return { clase }
    }

    // Precondicion: Ninguna
    // Postcondicion: Devuelve true si la clase pertece al usuario, false en caso contrario
    static async perteneceAUsuario({ clase_cod, username })
    {
        const [rows] = await promisePool.query('SELECT PLANTILLA.plant_cod FROM CLASE LEFT JOIN ASIGNATURA ON CLASE.asig_cod = ASIGNATURA.asig_cod LEFT JOIN CURSO ON ASIGNATURA.curso_cod = CURSO.curso_cod LEFT JOIN CARRERA ON CURSO.carre_cod = CARRERA.carre_cod LEFT JOIN PLANTILLA ON PLANTILLA.plant_cod = CARRERA.plant_cod WHERE CLASE.clase_cod = ? AND PLANTILLA.usu_username = ?', [clase_cod, username])

        if (rows.length === 0) return { valida: false }

        return { valida: true, plant_cod: rows[0]['plant_cod'] }
    }

    // Precondicion: Ninguna
    // Postcondicion: Inserta una clase en la base de datos
    static async create({ clase_descrip, clase_tipo, clase_tipo_aula, clase_duracion, prof_cod, asig_cod })
    {
        const clase_cod = v4();
        const [rows] = await promisePool.query('INSERT INTO CLASE (clase_cod, clase_descrip, clase_tipo, clase_tipo_aula, clase_duracion, prof_cod, asig_cod) VALUES (?, ?, ?, ?, ?, ?, ?)', [clase_cod, clase_descrip, clase_tipo, clase_tipo_aula, clase_duracion, prof_cod, asig_cod])

        return { clase_cod }
    }

    // Precondicion: Existe la clase
    // Postcondicion: Actualiza la clase
    static async update({ clase_cod, clase_descrip, clase_tipo, clase_tipo_aula, clase_duracion, prof_cod })
    {
        await promisePool.query('UPDATE CLASE SET clase_descrip = ?, clase_tipo = ?, clase_tipo_aula = ?, clase_duracion = ?, prof_cod = ? WHERE clase_cod = ?', [clase_descrip, clase_tipo, clase_tipo_aula, clase_duracion, prof_cod, clase_cod])
    }

    // Precondicion: Existe la clase
    // Postcondicion: Elimina la clase
    static async delete({ clase_cod })
    {
        await promisePool.query('DELETE FROM CLASE WHERE clase_cod = ?', [clase_cod])
    }

    // Precondicion: Existe la clase
    // Postcondicion: Devuelve la clase generada de la clase en el horario
    static async getClaseGenerada({ clase_cod, horar_cod })
    {
        const [rows] = await promisePool.query('SELECT clase_gen_cod AS codigo, clase_gen_hinicio AS hinicio, clase_gen_hfin AS hfin, clase_gen_dia AS dia, aula_cod FROM CLAE_GENERADA WHERE clase_cod = ? AND horar_cod = ?', [clase_cod, horar_cod])

        if (rows.length === 0) return { exists: false }

        const clase_generada = rows[0]

        return { clase_generada, exists: true }
    }
}