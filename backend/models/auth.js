import { promisePool } from '../db.js'

/**
 * Modelo para gestionar la autenticación de usuarios en la base de datos.
 * Contiene métodos para obtener, guardar y eliminar usuarios.
 */
export class AuthModel {

  /**
   * Obtiene un usuario por su nombre de usuario.
   * 
   * @param {Object} param0 - Objeto con el nombre de usuario.
   * @param {string} param0.username - Nombre de usuario a buscar.
   * @returns {Object} - Un objeto con los datos del usuario y un booleano que indica si existe o no.
   */
  static async getByUsername({ username }) {
    const [rows] = await promisePool.query('SELECT * FROM USUARIO WHERE usu_username = ?;', [username]);
    let exists = false;

    // Comprobamos si el usuario existe
    if (rows.length > 0) {
      const user = { username: rows[0]["usu_username"], password: rows[0]["usu_password"] };
      return { user, exists: true };
    }
    return { user: null, exists };
  }

  /**
   * Almacena un nuevo usuario en la base de datos.
   * 
   * @param {Object} param0 - Objeto con los datos del nuevo usuario.
   * @param {string} param0.username - Nombre de usuario.
   * @param {string} param0.password - Contraseña del usuario.
   * @returns {void} - No retorna nada.
   */
  static async guardarUsuario({ username, password }) {
    await promisePool.query('INSERT INTO USUARIO (usu_username, usu_password) VALUES (?, ?);', [username, password]);
  }

  /**
   * Elimina un usuario de la base de datos por su nombre de usuario.
   * 
   * @param {Object} param0 - Objeto con el nombre de usuario a eliminar.
   * @param {string} param0.username - Nombre de usuario a eliminar.
   * @returns {void} - No retorna nada.
   */
  static async deleteByUsername({ username }) {
    await promisePool.query('DELETE FROM USUARIO WHERE usu_username = ?', [username]);
  }
}
