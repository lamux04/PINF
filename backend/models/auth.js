import { promisePool } from '../db.js'

export class AuthModel
{
    // Precondicion: Ninguna
    // Devuelve un objeto con usuario y password y un booleano con true o false
    static async getByUsername({ username })
    {
        // Consulta
        const [rows] = await promisePool.query('SELECT * FROM USUARIO WHERE usu_username = ?;', [username])
        let exists = false

        // Comprobamos si hay usuarios
        if (rows.length > 0) 
        {
            const user = { username: rows[0]["usu_username"], password: rows[0]["usu_password"] }
            return { user, exists: true}
        }
        return { user: null, exists }
    }

    // Precondicion: El usuario no existe
    // Almacena un usuario que contine username y password
    static async guardarUsuario({ username, password })
    {
        await promisePool.query('INSERT INTO USUARIO (usu_username, usu_password) VALUES (?, ?);', [username, password])
    }

    // Precondicion: El usuario existe
    // Elimina de la base de datos el usuario
    static async deleteByUsername({ username })
    {
        await promisePool.query('DELETE FROM USUARIO WHERE usu_username = ?', [username])
    }
}