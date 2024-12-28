import { CursoModel } from "./curso.js";
import { promisePool } from "../db.js";
import { v4 } from 'uuid';

/**
 * Modelo para gestionar las carreras en la base de datos.
 * Contiene métodos para obtener, crear, actualizar, eliminar carreras, y gestionar la relación con los cursos.
 */
export class CarreraModel {

  /**
   * Obtiene todas las carreras asociadas a una plantilla específica.
   * 
   * @param {Object} param0 - Objeto con el código de la plantilla.
   * @param {string} param0.plant_cod - Código de la plantilla a consultar.
   * @returns {Object} - Un objeto con un array de carreras, cada una con sus cursos asociados.
   */
  static async getByPlantilla({ plant_cod }) {
    const [rows] = await promisePool.query('SELECT carre_cod AS codigo, carre_nombre AS nombre FROM CARRERA WHERE plant_cod = ?', [plant_cod]);

    const carreras = [];

    // Para cada carrera, obtenemos los cursos asociados
    for (let row of rows) {
      const { cursos } = await CursoModel.getByCarrera({ carre_cod: row["codigo"] });
      row["cursos"] = cursos;
      carreras.push(row);
    }

    return { carreras };
  }

  /**
   * Obtiene una carrera específica por su código.
   * 
   * @param {Object} param0 - Objeto con el código de la carrera.
   * @param {string} param0.carre_cod - Código de la carrera a consultar.
   * @returns {Object} - Un objeto con los datos de la carrera y sus cursos asociados.
   */
  static async getByCodigo({ carre_cod }) {
    const [rows] = await promisePool.query('SELECT carre_cod AS codigo, carre_nombre AS nombre FROM CARRERA WHERE carre_cod = ?', [carre_cod]);

    const carrera = rows[0];
    
    // Obtenemos los cursos asociados a la carrera
    const { cursos } = await CursoModel.getByCarrera({ carre_cod });
    carrera["cursos"] = cursos;

    return { carrera };
  }

  /**
   * Verifica si una carrera pertenece a un usuario determinado.
   * 
   * @param {Object} param0 - Objeto con el código de la carrera y el nombre de usuario.
   * @param {string} param0.carre_cod - Código de la carrera a verificar.
   * @param {string} param0.username - Nombre de usuario a verificar.
   * @returns {Object} - Un objeto con un booleano que indica si la carrera pertenece al usuario.
   */
  static async perteneceAUsuario({ carre_cod, username }) {
    const [rows] = await promisePool.query('SELECT * FROM CARRERA c LEFT JOIN PLANTILLA p ON c.plant_cod = p.plant_cod WHERE p.usu_username = ? AND c.carre_cod = ?', [username, carre_cod]);
    return { valida: rows.length > 0 };
  }

  /**
   * Crea una nueva carrera asociada a una plantilla.
   * 
   * @param {Object} param0 - Objeto con los datos de la nueva carrera.
   * @param {string} param0.plant_cod - Código de la plantilla a la que pertenece la carrera.
   * @param {string} param0.carre_nombre - Nombre de la carrera.
   * @returns {Object} - Un objeto con el código de la carrera, código de la plantilla y nombre de la carrera.
   */
  static async create({ plant_cod, carre_nombre }) {
    const carre_cod = v4();
    await promisePool.query('INSERT INTO CARRERA (carre_cod, plant_cod, carre_nombre) VALUES (?, ?, ?)', [carre_cod, plant_cod, carre_nombre]);
    return { carre_cod, plant_cod, carre_nombre };
  }

  /**
   * Actualiza una carrera existente con un nuevo nombre.
   * 
   * @param {Object} param0 - Objeto con los nuevos datos de la carrera.
   * @param {string} param0.carre_cod - Código de la carrera a actualizar.
   * @param {string} param0.carre_nombre - Nuevo nombre de la carrera.
   * @returns {Object} - Un objeto con el código de la carrera y el nombre actualizado.
   */
  static async update({ carre_cod, carre_nombre }) {
    await promisePool.query('UPDATE CARRERA SET carre_nombre = ? WHERE carre_cod = ?', [carre_nombre, carre_cod]);
    return { carre_cod, carre_nombre };
  }

  /**
   * Elimina una carrera por su código.
   * 
   * @param {Object} param0 - Objeto con el código de la carrera a eliminar.
   * @param {string} param0.carre_cod - Código de la carrera a eliminar.
   * @returns {Object} - Un objeto con el código de la carrera eliminada.
   */
  static async delete({ carre_cod }) {
    await promisePool.query('DELETE FROM CARRERA WHERE carre_cod = ?', [carre_cod]);
    return { carre_cod };
  }

  /**
   * Obtiene el código de la plantilla asociada a una carrera.
   * 
   * @param {Object} param0 - Objeto con el código de la carrera.
   * @param {string} param0.carre_cod - Código de la carrera.
   * @returns {Object} - Un objeto con el código de la plantilla asociada a la carrera.
   */
  static async getPlantilla({ carre_cod }) {
    const [rows] = await promisePool.query('SELECT plant_cod FROM CARRERA WHERE carre_cod = ?', [carre_cod]);
    return { plant_cod: rows[0]["plant_cod"] };
  }

  /**
   * Obtiene los datos básicos de una carrera sin los cursos asociados.
   * 
   * @param {Object} param0 - Objeto con el código de la carrera.
   * @param {string} param0.carre_cod - Código de la carrera.
   * @returns {Object} - Un objeto con los datos básicos de la carrera.
   */
  static async getSoloCarrera({ carre_cod }) {
    const [rows] = await promisePool.query('SELECT carre_cod, carre_nombre FROM CARRERA WHERE carre_cod = ?', [carre_cod]);

    if (rows.length === 0) {
      return { exists: false };
    }

    return { exists: rows.length > 0, carre_cod, carre_nombre: rows[0]["carre_nombre"] };
  }

  /**
   * Obtiene todos los cursos asociados a una carrera.
   * 
   * @param {Object} param0 - Objeto con el código de la carrera.
   * @param {string} param0.carre_cod - Código de la carrera.
   * @returns {Object} - Un objeto con el listado de cursos pertenecientes a la carrera.
   */
  static async getCursos({ carre_cod }) {
    const [rows] = await promisePool.query('SELECT curso_cod codigo, curso_nombre nombre FROM CARRERA LEFT JOIN CURSO ON CARRERA.carre_cod = CURSO.carre_cod WHERE CARRERA.carre_cod = ?', [carre_cod]);
    return { cursos: rows };
  }
}
