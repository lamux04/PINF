import { CursoModel } from '../models/curso.js'
import { CarreraModel } from '../models/carrera.js'
import { HorarioModel } from '../models/horario.js'

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
        const { valida } = await CarreraModel.perteneceAUsuario({ carre_cod: carrera, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })
        
        // Obtenemos los cursos
        const { cursos } = await CursoModel.getByCarrera({ carre_cod: carrera })

        res.json({ cursos })
    }

    // GET /api/curso/:curs_cod
    static async getByCodigo(req, res)
    {
        // Obtenemos los atributos
        const { username } = req.user
        const { curso_cod } = req.params

        // Comprobamos que el curso sea del usuario
        const { valida } = await CursoModel.perteneceAUsuario({ curso_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })

        // Obtenemos el curso
        const { curso } = await CursoModel.getByCodigo({ curso_cod })

        res.json(curso)
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
        const { valida } = await CarreraModel.perteneceAUsuario({ carre_cod: carrera, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })

        // Creamos el curso
        const { curso_cod } = await CursoModel.create({ carre_cod: carrera, carre_nombre: nombre })

        // Obtenemos la plantilla de la carrera
        const { plant_cod } = await CarreraModel.getPlantilla({ carre_cod: carrera })

        // Eliminamos todos los horarios de la plantilla
        await HorarioModel.deleteByPlantilla({ plant_cod });

        res.json({ codigo: curso_cod, nombre })
    }

    // PATCH /api/curso/:curs_cod { nombre }
    static async update(req, res)
    {
        // Obtenemos los atributos
        const { username } = req.user
        const { curso_cod } = req.params
        const { nombre } = req.body

        // Validamos los atributos
        if (!curso_cod) return res.status(400).json({ message: 'Codigo de curso es requerido' })

        // Comprobamos que el curso sea del usuario
        const { valida } = await CursoModel.perteneceAUsuario({ curso_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })
        
        // Obtenemos el nombre actual del curso
        const { curso_nombre, exists } = await CursoModel.getSoloCurso({ curso_cod })
        if (!exists) return res.status(404).json({ message: 'Curso no encontrado' })

        // Actualizamos el curso
        await CursoModel.update({ curso_cod, curso_nombre: nombre ?? curso_nombre })

        res.json({ codigo: curso_cod, nombre: nombre ?? curso_nombre })
    }

    // DELETE /api/curso/:curs_cod
    static async delete(req, res)
    {
        // Obtenemos los atributos
        const { username } = req.user
        const { curso_cod } = req.params

        // Validamos los atributos
        if (!curso_cod) return res.status(400).json({ message: 'Codigo de curso es requerido' })

        // Comprobamos que el curso sea del usuario
        const { valida } = await CursoModel.perteneceAUsuario({ curso_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })

        // Obtenemos la plantilla del curso
        const { plant_cod } = await CursoModel.getPlantilla({ curso_cod })

        // Eliminamos el curso
        await CursoModel.delete({ curso_cod })

        // Eliminamos todos los horarios de la plantilla
        await HorarioModel.deleteByPlantilla({ plant_cod });

        res.json({ message: 'Curso eliminado' })
    }

    // GET /api/curso/verificar/:curso_cod
    static async verifyCurso(req, res)
    {
        // Obtenemos los atributos
        const { username } = req.user
        const { curso_cod } = req.params

        // Comprobamos que el curso sea del usuario
        const { valida } = await CursoModel.perteneceAUsuario({ curso_cod, username })
        if (!valida) return res.status(400).json({ message: 'Curso no encontrado' })

        res.json({ message: 'Curso valido', username })
    }

    // GET /api/curso/ver_curso/:curso_cod
    static async verCurso(req, res)
    {
        // Obtenemos los atributos
        const { username } = req.user
        const { curso_cod } = req.params

        // Comprobamos que el curso sea del usuario
        const { valida } = await CursoModel.perteneceAUsuario({ curso_cod, username })
        if (!valida) return res.status(400).json({ message: 'Curso no encontrado' })

        // Obtenemos el curso
        const { curso } = await CursoModel.getByCodigo({ curso_cod })

        res.json(curso)
    }
}