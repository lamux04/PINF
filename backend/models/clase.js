import { promisePool } from "../db.js";

export class ClaseModel
{
    // Precondicion: La asignatura existe
    // Postcondicion: Devuelve un array con las clases de dicha asignatura
    static async getByAsignatura({ asig_cod })
    {
        const [rows] = await promisePool.query('SELECT clase_cod AS codigo, clase_descrip AS descripcion, clase_tipo AS tipo, clase_tipo_aula AS "tipo aula", CLASE.prof_cod AS "profesor codigo", CONCAT(prof_nombre, " ", prof_apell1, " ", prof_apell2) AS "profesor nombre" FROM CLASE LEFT JOIN PROFESOR ON CLASE.prof_cod = PROFESOR.prof_cod WHERE asig_cod = ?', [asig_cod])

        const clases = rows

        return { clases }
    }
}