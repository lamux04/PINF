export class AulaModel
{
    // Precondicion: La plantilla existe
    // Postcondicion: Devuelve un array con todas las aulas pertenecientes a dicha plantilla
    static async getByPlantilla({ plant_cod })
    {

    }

    static async getAll()
    {
        // Llamada a la base de datos
        return { aulas }
    }

    static async getByCodigo({ codigo })
    {
        // Si el codigo es invalido, devolveriamos false o devolver dos valores
        if (codigo == -1) return false
        // Llamada a la base de datos
        return aulas[0]
    }

    static async create(input)
    {
        const nuevaAula =
        {
            codigo: "1234", // Crear codigo
            ...input
        }
        return nuevaAula
    }
}