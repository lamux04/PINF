export class UsuarioModel
{
    // Devuelve true si el usuario es correcto y false si no lo es
    static async login({ username, password }) 
    {
        // Buscar username en la base de datos
        // Si existe, extraerlo junto a su contrasenna
        // Hashear la el parametro password y compararlo con el almacenado
    }
}