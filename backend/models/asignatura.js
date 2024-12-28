import { promisePool } from "../db.js"
import { ClaseModel } from "./clase.js"
import { v4 } from 'uuid'

/**
 * Modelo para gestionar las asignaturas en la base de datos.
 * Contiene métodos para obtener, crear, actualizar, eliminar asignaturas y verificar si pertenecen a un usuario.
 */
export class AsignaturaModel {
  
  /**
   * Obtiene todas las asignaturas de un curso específico.
   * 
   * @param {Object} param0 - Objeto con el código del curso.
   * @param {string} param0.curso_cod - Código del curso.
   * @returns {Object} - Lista de asignaturas con sus clases asociadas.
   */
  static async getByCurso({ curso_cod }) {
    const [rows] = await promisePool.query('SELECT asig_cod AS codigo, asig_nombre AS nombre, asig_probabilidad AS aprobabilidad FROM ASIGNATURA WHERE curso_cod = ?', [curso_cod]);

    const asignaturas = [];
    for (let row of rows) {
      const { clases } = await ClaseModel.getByAsignatura({ asig_cod: row["codigo"] });
      row["clases"] = clases;
      asignaturas.push(row);
    }
    return { asignaturas };
  }

  /**
   * Verifica si una asignatura pertenece a un usuario específico.
   * 
   * @param {Object} param0 - Objeto con el código de la asignatura y el nombre de usuario.
   * @param {string} param0.asig_cod - Código de la asignatura.
   * @param {string} param0.username - Nombre de usuario.
   * @returns {Object} - Objeto con la validez de la asignatura y, si es válida, el código de la plantilla.
   */
  static async perteneceAUsuario({ asig_cod, username }) {
    const [rows] = await promisePool.query('SELECT PL.plant_cod FROM ASIGNATURA A, CURSO C, CARRERA CA, PLANTILLA PL WHERE A.curso_cod = C.curso_cod AND C.carre_cod = CA.carre_cod AND PL.plant_cod = CA.plant_cod AND usu_username = ? AND A.asig_cod = ?', [username, asig_cod]);

    if (rows.length == 0) return { valida: false };
    return { valida: rows.length > 0, plant_cod: rows[0]["plant_cod"] };
  }

  /**
   * Obtiene una asignatura específica por su código.
   * 
   * @param {Object} param0 - Objeto con el código de la asignatura.
   * @param {string} param0.asig_cod - Código de la asignatura.
   * @returns {Object} - Información de la asignatura con sus clases asociadas.
   */
  static async getByCodigo({ asig_cod }) {
    const [rows] = await promisePool.query('SELECT asig_cod AS codigo, asig_nombre AS nombre, asig_probabilidad AS aprobabilidad FROM ASIGNATURA WHERE asig_cod = ?', [asig_cod]);

    const asignatura = rows[0];
    const { clases } = await ClaseModel.getByAsignatura({ asig_cod });
    asignatura["clases"] = clases;

    return { asignatura };
  }

  /**
   * Crea una nueva asignatura en la base de datos.
   * 
   * @param {Object} param0 - Objeto con los datos de la asignatura a crear.
   * @param {string} param0.asig_nombre - Nombre de la asignatura.
   * @param {number} param0.asig_aprobabilidad - Probabilidad de aprobación de la asignatura.
   * @param {string} param0.curso_cod - Código del curso al que pertenece la asignatura.
   * @returns {Object} - Objeto con el código generado para la nueva asignatura.
   */
  static async create({ asig_nombre, asig_aprobabilidad, curso_cod }) {
    const asig_cod = v4();
    await promisePool.query('INSERT INTO ASIGNATURA (asig_nombre, asig_probabilidad, curso_cod, asig_cod) VALUES (?, ?, ?, ?)', [asig_nombre, asig_aprobabilidad, curso_cod, asig_cod]);

    return { asig_cod };
  }

  /**
   * Obtiene solo la asignatura (sin las clases asociadas) por su código.
   * 
   * @param {Object} param0 - Objeto con el código de la asignatura.
   * @param {string} param0.asig_cod - Código de la asignatura.
   * @returns {Object} - Objeto con la asignatura sin las clases.
   */
  static async getSoloAsignatura({ asig_cod }) {
    const [rows] = await promisePool.query('SELECT asig_cod AS codigo, asig_nombre AS nombre, asig_probabilidad AS aprobabilidad FROM ASIGNATURA WHERE asig_cod = ?', [asig_cod]);

    return { asig_cod, asig_nombre: rows[0]["nombre"], asig_aprobabilidad: rows[0]["aprobabilidad"] };
  }

  /**
   * Actualiza los detalles de una asignatura existente.
   * 
   * @param {Object} param0 - Objeto con los datos de la asignatura a actualizar.
   * @param {string} param0.asig_cod - Código de la asignatura.
   * @param {string} param0.asig_nombre - Nuevo nombre de la asignatura.
   * @param {number} param0.asig_aprobabilidad - Nueva probabilidad de aprobación de la asignatura.
   * @returns {Object} - Objeto con los nuevos datos de la asignatura.
   */
  static async update({ asig_cod, asig_nombre, asig_aprobabilidad }) {
    await promisePool.query('UPDATE ASIGNATURA SET asig_nombre = ?, asig_probabilidad = ? WHERE asig_cod = ?', [asig_nombre, asig_aprobabilidad, asig_cod]);

    return { asig_cod, asig_nombre, asig_aprobabilidad };
  }

  /**
   * Elimina una asignatura de la base de datos por su código.
   * 
   * @param {Object} param0 - Objeto con el código de la asignatura a eliminar.
   * @param {string} param0.asig_cod - Código de la asignatura a eliminar.
   * @returns {Object} - Objeto con el código de la asignatura eliminada.
   */
  static async delete({ asig_cod }) {
    await promisePool.query('DELETE FROM ASIGNATURA WHERE asig_cod = ?', [asig_cod]);

    return { asig_cod };
  }
}
