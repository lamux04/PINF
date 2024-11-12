export class CursoController
{
    // GET /api/curso { carrera }
    static async getAll(req, res)
    {
        // Obtenemos los atributos
        const { username } = req.user
        const { carrera } = req.body

        // Validamos los atributos
        if (!carrera) return res.status(400).json({ message: 'Carrera es requerido' })
        
        // Comprobamos que la carrera sea del usuario
        const { valida } = await CarreraModel.perteneceAUsuario({ carrera, username })
        if (!valida) return res.status(401).json({ message: 'No tienes acceso a esta carrera' })
        
        // Obtenemos los cursos
        const { cursos } = await CursoModel.getByCarrera({ carre_cod: carrera })

        res.json({ cursos })
    }

    // GET /api/curso/:curs_cod
    static async getByCodigo(req, res)
    {
        // Obtenemos los atributos
        const { username } = req.user
        const { curs_cod } = req.params

        // Validamos los atributos
        if (!curs_cod) return res.status(400).json({ message: 'Codigo de curso es requerido' })

        // Comprobamos que el curso sea del usuario
        const { valida } = await CursoModel.perteneceAUsuario({ curs_cod, username })
        if (!valida) return res.status(401).json({ message: 'No tienes acceso a este curso' })

        // Obtenemos el curso
        const { curso } = await CursoModel.getByCodigo({ curs_cod })

        res.json({ curso })
    }

    // POST /api/curso { carrera, nombre }
    static async create(req, res)
    {
        // Obtenemos los atributos
        const { username } = req.user
        const { carrera, nombre } = req.body

        // Validamos los atributos
        if (!carrera) return res.status(400).json({ message: 'Carrera es requerido' })
        if (!nombre) return res.status(400).json({ message: 'Nombre es requerido' })

        // Comprobamos que la carrera sea del usuario
        const { valida } = await CarreraModel.perteneceAUsuario({ carrera, username })
        if (!valida) return res.status(401).json({ message: 'No tienes acceso a esta carrera' })

        // Creamos el curso
        const { curso_cod } = await CursoModel.create({ carre_cod: carrera, carre_nombre: nombre })

        res.json({ curso_cod, carrera, nombre })
    }

    
}