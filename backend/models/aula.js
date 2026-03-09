import { promisePool } from "../db.js"
import { v4 } from 'uuid'

/**
 * Modelo para gestionar las aulas en la base de datos.
 * Contiene métodos para obtener, crear, actualizar, eliminar aulas y verificar si pertenecen a un usuario.
 */
export class AulaModel {

  /**
   * Obtiene todas las aulas asociadas a una plantilla.
   * 
   * @param {Object} param0 - Objeto con el código de la plantilla.
   * @param {string} param0.plant_cod - Código de la plantilla.
   * @returns {Object} - Lista de aulas pertenecientes a la plantilla.
   */
  static async getByPlantilla({ plant_cod }) {
    const [rows] = await promisePool.query('SELECT aula_cod AS codigo, aula_nombre AS nombre, aula_tipo AS tipo FROM AULA WHERE plant_cod = ?', [plant_cod]);

    return { aulas: rows };
  }

  /**
   * Obtiene un aula específica por su código.
   * 
   * @param {Object} param0 - Objeto con el código del aula.
   * @param {string} param0.aula_cod - Código del aula.
   * @returns {Object} - Información del aula especificada.
   */
  static async getByCodigo({ aula_cod }) {
    const [rows] = await promisePool.query('SELECT aula_cod AS codigo, aula_nombre AS nombre, aula_tipo AS tipo FROM AULA WHERE aula_cod = ?', [aula_cod]);

    return { aula: rows[0] };
  }

  /**
   * Verifica si un aula pertenece a un usuario específico.
   * 
   * @param {Object} param0 - Objeto con el código del aula y el nombre de usuario.
   * @param {string} param0.aula_cod - Código del aula.
   * @param {string} param0.username - Nombre de usuario.
   * @returns {Object} - Objeto con la validez de la pertenencia del aula y, si es válida, el código de la plantilla asociada.
   */
  static async perteneceAUsuario({ aula_cod, username }) {
    const [rows] = await promisePool.query('SELECT PLANTILLA.plant_cod FROM AULA LEFT JOIN PLANTILLA ON AULA.plant_cod = PLANTILLA.plant_cod WHERE AULA.aula_cod = ? AND PLANTILLA.usu_username = ?', [aula_cod, username]);

    if (rows.length === 0) return { valida: false };

    return { valida: true, plant_cod: rows[0]['plant_cod'] };
  }

  /**
   * Crea un nuevo aula y devuelve su código.
   * 
   * @param {Object} param0 - Objeto con los datos del aula.
   * @param {string} param0.plant_cod - Código de la plantilla a la que pertenece el aula.
   * @param {string} param0.aula_nombre - Nombre del aula.
   * @param {string} param0.aula_tipo - Tipo de aula (por ejemplo, laboratorio, conferencia, etc.).
   * @returns {Object} - Objeto con el código generado para el nuevo aula.
   */
  static async create({ plant_cod, aula_nombre, aula_tipo }) {
    const aula_cod = v4();
    await promisePool.query('INSERT INTO AULA (aula_cod, plant_cod, aula_nombre, aula_tipo) VALUES (?, ?, ?, ?)', [aula_cod, plant_cod, aula_nombre, aula_tipo]);

    return { aula_cod };
  }

  /**
   * Actualiza los datos de un aula existente.
   * 
   * @param {Object} param0 - Objeto con los datos del aula a actualizar.
   * @param {string} param0.aula_cod - Código del aula a actualizar.
   * @param {string} param0.aula_nombre - Nuevo nombre del aula.
   * @param {string} param0.aula_tipo - Nuevo tipo del aula.
   * @returns {void} - No retorna nada.
   */
  static async update({ aula_cod, aula_nombre, aula_tipo }) {
    await promisePool.query('UPDATE AULA SET aula_nombre = ?, aula_tipo = ? WHERE aula_cod = ?', [aula_nombre, aula_tipo, aula_cod]);
  }

  /**
   * Elimina un aula de la base de datos por su código.
   * 
   * @param {Object} param0 - Objeto con el código del aula a eliminar.
   * @param {string} param0.aula_cod - Código del aula a eliminar.
   * @returns {void} - No retorna nada.
   */
  static async delete({ aula_cod }) {
    await promisePool.query('DELETE FROM AULA WHERE aula_cod = ?', [aula_cod]);
  }
}
