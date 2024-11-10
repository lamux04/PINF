export class ClaseGeneradaModel
{
    // Postcondicion: Devuelve la clase generada con el codigo dado
    static async getByCodigo({ clase_cod, hor_cod })
    {
        const [rows] = await promisePool.query('SELECT clase_gen_cod AS codigo, clase_gen_hinicio AS hinicio, clase_gen_hfin AS hfin, clase_gen_dia AS dia, aula_cod FROM CLASE_GENERADA WHERE clase_cod = ? AND horar_cod = ?', [clase_cod, hor_cod])

        if (rows.length == 0) return { clase_generada: null, exists: false }

        return { clase_generada: rows[0], exists: true }
    }
}