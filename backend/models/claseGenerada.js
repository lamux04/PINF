import { promisePool } from "../db.js";
import { v4 } from 'uuid';

/**
 * Modelo para gestionar las clases en la base de datos.
 * Contiene métodos para obtener, crear, actualizar, eliminar clases, y gestionar la relación con asignaturas y usuarios.
 */
export class ClaseModel {

  /**
   * Obtiene todas las clases asociadas a una asignatura específica.
   * 
   * @param {Object} param0 - Objeto con el código de la asignatura.
   * @param {string} param0.asig_cod - Código de la asignatura.
   * @returns {Object} - Un objeto con un array de clases, con sus detalles y los datos del profesor asignado.
   */
  static async getByAsignatura({ asig_cod }) {
    const [rows] = await promisePool.query("SELECT clase_cod AS codigo, clase_descrip AS descripcion, clase_tipo AS tipo, clase_duracion AS duracion, clase_tipo_aula AS 'tipo aula', CLASE.prof_cod AS 'profesor codigo', CONCAT(prof_nombre, ' ', prof_apell1, ' ', prof_apell2) AS 'profesor nombre', clase_importante AS importante FROM CLASE LEFT JOIN PROFESOR ON CLASE.prof_cod = PROFESOR.prof_cod WHERE asig_cod = ?", [asig_cod]);

    const clases = rows;

    return { clases };
  }

  /**
   * Obtiene una clase específica por su código.
   * 
   * @param {Object} param0 - Objeto con el código de la clase.
   * @param {string} param0.clase_cod - Código de la clase.
   * @returns {Object} - Un objeto con los detalles de la clase, incluyendo los datos del profesor asignado.
   */
  static async getByCodigo({ clase_cod }) {
    const [rows] = await promisePool.query('SELECT clase_cod AS codigo, clase_descrip AS descripcion, clase_tipo AS tipo, clase_duracion AS duracion, clase_tipo_aula AS "tipo aula", CLASE.prof_cod AS "codigo profesor", CONCAT(prof_nombre, " ", prof_apell1, " ", prof_apell2) AS "profesor nombre", clase_importante AS importante FROM CLASE LEFT JOIN PROFESOR ON CLASE.prof_cod = PROFESOR.prof_cod WHERE clase_cod = ?', [clase_cod]);

    const clase = rows[0];

    return { clase };
  }

  /**
   * Verifica si una clase pertenece a un usuario determinado.
   * 
   * @param {Object} param0 - Objeto con el código de la clase y el nombre de usuario.
   * @param {string} param0.clase_cod - Código de la clase.
   * @param {string} param0.username - Nombre de usuario.
   * @returns {Object} - Un objeto con un booleano que indica si la clase pertenece al usuario, y el código de la plantilla si corresponde.
   */
  static async perteneceAUsuario({ clase_cod, username }) {
    const [rows] = await promisePool.query('SELECT PLANTILLA.plant_cod FROM CLASE LEFT JOIN ASIGNATURA ON CLASE.asig_cod = ASIGNATURA.asig_cod LEFT JOIN CURSO ON ASIGNATURA.curso_cod = CURSO.curso_cod LEFT JOIN CARRERA ON CURSO.carre_cod = CARRERA.carre_cod LEFT JOIN PLANTILLA ON PLANTILLA.plant_cod = CARRERA.plant_cod WHERE CLASE.clase_cod = ? AND PLANTILLA.usu_username = ?', [clase_cod, username]);

    if (rows.length === 0) return { valida: false };

    return { valida: true, plant_cod: rows[0]['plant_cod'] };
  }

  /**
   * Crea una nueva clase asociada a una asignatura y profesor.
   * 
   * @param {Object} param0 - Objeto con los datos de la clase.
   * @param {string} param0.clase_descrip - Descripción de la clase.
   * @param {string} param0.clase_tipo - Tipo de la clase (teórica, práctica, etc.).
   * @param {string} param0.clase_tipo_aula - Tipo de aula donde se imparte la clase.
   * @param {number} param0.clase_duracion - Duración de la clase (en minutos).
   * @param {string} param0.prof_cod - Código del profesor asignado a la clase.
   * @param {string} param0.asig_cod - Código de la asignatura asociada a la clase.
   * @param {boolean} param0.clase_importante - Indica si la clase es importante.
   * @returns {Object} - Un objeto con el código de la nueva clase.
   */
  static async create({ clase_descrip, clase_tipo, clase_tipo_aula, clase_duracion, prof_cod, asig_cod, clase_importante }) {
    const clase_cod = v4();
    await promisePool.query('INSERT INTO CLASE (clase_cod, clase_descrip, clase_tipo, clase_tipo_aula, clase_duracion, prof_cod, asig_cod, clase_importante) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [clase_cod, clase_descrip, clase_tipo, clase_tipo_aula, clase_duracion, prof_cod, asig_cod, clase_importante]);

    return { clase_cod };
  }

  /**
   * Actualiza los detalles de una clase existente.
   * 
   * @param {Object} param0 - Objeto con los nuevos datos de la clase.
   * @param {string} param0.clase_cod - Código de la clase a actualizar.
   * @param {string} param0.clase_descrip - Nueva descripción de la clase.
   * @param {string} param0.clase_tipo - Nuevo tipo de la clase (teórica, práctica, etc.).
   * @param {string} param0.clase_tipo_aula - Nuevo tipo de aula donde se imparte la clase.
   * @param {number} param0.clase_duracion - Nueva duración de la clase.
   * @param {string} param0.prof_cod - Nuevo código de profesor asignado.
   */
  static async update({ clase_cod, clase_descrip, clase_tipo, clase_tipo_aula, clase_duracion, prof_cod }) {
    await promisePool.query('UPDATE CLASE SET clase_descrip = ?, clase_tipo = ?, clase_tipo_aula = ?, clase_duracion = ?, prof_cod = ? WHERE clase_cod = ?', [clase_descrip, clase_tipo, clase_tipo_aula, clase_duracion, prof_cod, clase_cod]);
  }

  /**
   * Elimina una clase por su código.
   * 
   * @param {Object} param0 - Objeto con el código de la clase a eliminar.
   * @param {string} param0.clase_cod - Código de la clase a eliminar.
   */
  static async delete({ clase_cod }) {
    await promisePool.query('DELETE FROM CLASE WHERE clase_cod = ?', [clase_cod]);
  }

  /**
   * Obtiene los detalles de la clase generada en un horario específico.
   * 
   * @param {Object} param0 - Objeto con el código de la clase y el código del horario.
   * @param {string} param0.clase_cod - Código de la clase.
   * @param {string} param0.horar_cod - Código del horario.
   * @returns {Object} - Un objeto con los detalles de la clase generada, incluyendo aula y horario.
   */
  static async getClaseGenerada({ clase_cod, horar_cod }) {
    const [rows] = await promisePool.query('SELECT clase_gen_cod AS codigo, clase_gen_hinicio AS hinicio, clase_gen_hfin AS hfin, clase_gen_dia AS dia, AULA.aula_nombre AS aula FROM CLAE_GENERADA LEFT JOIN AULA ON CLAE_GENERADA.aula_cod = AULA.aula_cod WHERE clase_cod = ? AND horar_cod = ?', [clase_cod, horar_cod]);

    if (rows.length === 0) return { exists: false };

    const clase_generada = rows[0];

    return { clase_generada, exists: true };
  }
}
