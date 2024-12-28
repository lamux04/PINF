import { promisePool } from '../db.js';
import { AsignaturaModel } from './asignatura.js';
import { v4 } from 'uuid'

/**
 * Modelo para gestionar los cursos asociados a una carrera. 
 * Contiene métodos para obtener, crear, actualizar y eliminar cursos, así como comprobar la pertenencia de un usuario a un curso.
 */
export class CursoModel {

  /**
   * Obtiene los cursos asociados a una carrera específica.
   * 
   * @param {Object} param0 - Objeto con el código de la carrera.
   * @param {string} param0.carre_cod - Código de la carrera.
   * @returns {Object} - Un objeto con la lista de cursos asociados a la carrera.
   */
  static async getByCarrera({ carre_cod }) {
    const [rows] = await promisePool.query('SELECT curso_cod AS codigo, curso_nombre AS nombre FROM CURSO WHERE carre_cod = ?', [carre_cod]);

    const cursos = []

    for (let row of rows) {
      // Obtenemos todas las asignaturas de los cursos
      const { asignaturas } = await AsignaturaModel.getByCurso({ curso_cod: row["codigo"] });
      row["asignaturas"] = asignaturas;

      cursos.push(row);
    }

    return { cursos };
  }

  /**
   * Obtiene los detalles de un curso específico dado su código.
   * 
   * @param {Object} param0 - Objeto con el código del curso.
   * @param {string} param0.curso_cod - Código del curso.
   * @returns {Object} - Un objeto con los detalles del curso, incluida la información de la carrera y plantilla asociada.
   */
  static async getByCodigo({ curso_cod }) {
    const [rows] = await promisePool.query('SELECT curso_cod AS codigo, curso_nombre AS nombre, carre_cod FROM CURSO WHERE curso_cod = ?', [curso_cod]);

    const curso = rows[0];

    // Obtenemos todas las asignaturas del curso
    const { asignaturas } = await AsignaturaModel.getByCurso({ curso_cod });
    curso["asignaturas"] = asignaturas;

    // Obtenemos el nombre de la carrera
    const [rows2] = await promisePool.query('SELECT carre_nombre AS nombre, plant_cod FROM CARRERA WHERE carre_cod = ?', [curso["carre_cod"]]);
    curso["carre_nombre"] = rows2[0]["nombre"];

    // Obtenemos el nombre de la plantilla
    const [rows3] = await promisePool.query('SELECT plant_nombre AS nombre FROM PLANTILLA WHERE plant_cod = ?', [rows2[0]["plant_cod"]]);
    curso["plant_nombre"] = rows3[0]["nombre"];
    curso["plant_cod"] = rows2[0]["plant_cod"];

    return { curso };
  }

  /**
   * Comprueba si un usuario tiene acceso a un curso específico.
   * 
   * @param {Object} param0 - Objeto con el código del curso y el nombre de usuario.
   * @param {string} param0.curso_cod - Código del curso.
   * @param {string} param0.username - Nombre de usuario.
   * @returns {Object} - Un objeto con un booleano que indica si el usuario tiene acceso al curso.
   */
  static async perteneceAUsuario({ curso_cod, username }) {
    const [rows] = await promisePool.query('SELECT ca.carre_cod FROM CARRERA ca, CURSO cu, PLANTILLA p WHERE ca.carre_cod = cu.carre_cod AND ca.plant_cod = p.plant_cod AND cu.curso_cod = ? AND p.usu_username = ?', [curso_cod, username]);

    if (rows.length === 0) return { valida: false };

    return { valida: rows.length > 0, carre_cod: rows[0]['carre_cod'] };
  }

  /**
   * Crea un nuevo curso con los datos proporcionados.
   * 
   * @param {Object} param0 - Objeto con el código de la carrera y el nombre del curso.
   * @param {string} param0.carre_cod - Código de la carrera.
   * @param {string} param0.carre_nombre - Nombre de la carrera.
   * @returns {Object} - Un objeto con el código, nombre de la carrera y curso creados.
   */
  static async create({ carre_cod, carre_nombre }) {
    const curso_cod = v4();
    const [rows] = await promisePool.query('INSERT INTO CURSO (curso_cod, carre_cod, curso_nombre) VALUES (?, ?, ?)', [curso_cod, carre_cod, carre_nombre]);

    return { curso_cod, carre_cod, carre_nombre };
  }

  /**
   * Actualiza el nombre de un curso con los datos proporcionados.
   * 
   * @param {Object} param0 - Objeto con el código del curso y el nuevo nombre.
   * @param {string} param0.curso_cod - Código del curso.
   * @param {string} param0.curso_nombre - Nuevo nombre del curso.
   */
  static async update({ curso_cod, curso_nombre }) {
    await promisePool.query('UPDATE CURSO SET curso_nombre = ? WHERE curso_cod = ?', [curso_nombre, curso_cod]);
  }

  /**
   * Elimina un curso con el código dado.
   * 
   * @param {Object} param0 - Objeto con el código del curso.
   * @param {string} param0.curso_cod - Código del curso a eliminar.
   */
  static async delete({ curso_cod }) {
    await promisePool.query('DELETE FROM CURSO WHERE curso_cod = ?', [curso_cod]);
  }

  /**
   * Devuelve solo el nombre y el código del curso.
   * 
   * @param {Object} param0 - Objeto con el código del curso.
   * @param {string} param0.curso_cod - Código del curso.
   * @returns {Object} - Un objeto con el nombre y código del curso si existe.
   */
  static async getSoloCurso({ curso_cod }) {
    const [rows] = await promisePool.query('SELECT curso_cod, curso_nombre FROM CURSO WHERE curso_cod = ?', [curso_cod]);

    if (rows.length == 0) return { exists: false };

    return { exists: true, curso_cod, curso_nombre: rows[0]["curso_nombre"] };
  }

  /**
   * Devuelve el código de la plantilla asociada al curso.
   * 
   * @param {Object} param0 - Objeto con el código del curso.
   * @param {string} param0.curso_cod - Código del curso.
   * @returns {Object} - Un objeto con el código de la plantilla asociada.
   */
  static async getPlantilla({ curso_cod }) {
    const [rows] = await promisePool.query('SELECT p.plant_cod FROM CURSO cu, CARRERA ca, PLANTILLA p WHERE cu.carre_cod = ca.carre_cod AND ca.plant_cod = p.plant_cod AND cu.curso_cod = ?', [curso_cod]);

    return { plant_cod: rows[0]["plant_cod"] };
  }
}
