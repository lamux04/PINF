import { PlantillaModel } from "../models/plantilla.js";
import { ProfesorModel } from "../models/profesor.js";

export class ProfesorController
{
    // GET /api/profesor { plantilla }
    static async getProfesores(req, res)
    {
        // Obtenemos los atributos de la plantilla
        const { plantilla: plant_cod } = req.query
        const { username } = req.user

        // Validamos los atributos
        if (!plant_cod) return res.status(400).json({ message: 'Plantilla es requerido' })
        
        // Comprobamos que la plantilla sea del usuario
        const { valida } = await PlantillaModel.perteneceAUsuario({ plant_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })
        
        // Obtenemos los profesores
        const { profesores } = await ProfesorModel.getByPlantilla({ plant_cod })

        res.json({ profesores })
    }

    // GET /api/profesor/:prof_cod
    static async getProfesor(req, res)
    {
        // Obtenemos los atributos de la plantilla
        const { prof_cod } = req.params
        const { username } = req.user

        // Comprobamos que el profesor sea del usuario
        const { valida } = await ProfesorModel.perteneceAUsuario({ prof_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })
        
        // Obtenemos el profesor
        const { profesor } = await ProfesorModel.getByCodigo({ prof_cod })

        res.json(profesor)
    }

    // POST /api/profesor { plantilla, nombre, apellido1, apellido2 }
    static async createProfesor(req, res)
    {
        // Obtenemos los atributos
        const { plantilla: plant_cod, nombre: prof_nombre, apellido1: prof_apell1, apellido2: prof_apell2 } = req.body
        const { username } = req.user

        // Validamos los atributos
        if (!plant_cod) return res.status(400).json({ message: 'Plantilla es requerida' })
        if (!prof_nombre) return res.status(400).json({ message: 'Nombre es requerido' })
        if (!prof_apell1) return res.status(400).json({ message: 'Apellido1 es requerido' })
        if (!prof_apell2) return res.status(400).json({ message: 'Apellido2 es requerido' })
        
        // Comprobamos que la plantilla sea del usuario
        const { valida } = await PlantillaModel.perteneceAUsuario({ plant_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })
        
        // Creamos el profesor
        const { prof_cod } = await ProfesorModel.create({ plant_cod, prof_nombre, prof_apell1, prof_apell2 })

        res.json({ codigo: prof_cod, nombre: prof_nombre, apellidos: `${prof_apell1} ${prof_apell2}` })
    }

    // PATCH /api/profesor/:prof_cod { nombre, apellido1, apellido2 }
    static async updateProfesor(req, res)
    {
        // Obtenemos los atributos
        const { nombre: prof_nombre, apellido1: prof_apell1, apellido2: prof_apell2 } = req.body
        const { prof_cod } = req.params
        const { username } = req.user
        
        // Comprobamos que el profesor sea del usuario
        const { valida } = await ProfesorModel.perteneceAUsuario({ prof_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })
        
        // Obtenemos el profesor
        const { profesor } = await ProfesorModel.getByCodigo({ prof_cod })

        const nuevoProfesor = {
            prof_cod,
            prof_nombre: prof_nombre ?? profesor['prof_nombre'],
            prof_apell1: prof_apell1 ?? profesor['apellidos'].split(' ')[0],
            prof_apell2: prof_apell2 ?? profesor['apellidos'].split(' ')[1]
        }
        
        // Actualizamos el profesor
        await ProfesorModel.update(nuevoProfesor)

        res.json({ codigo: nuevoProfesor.prof_cod, nombre: nuevoProfesor.prof_nombre, apellido1: nuevoProfesor.prof_apell1, apellido2: nuevoProfesor.prof_apell2 })
    }

    // DELETE /api/profesor/:prof_cod
    static async deleteProfesor(req, res)
    {
        // Obtenemos los atributos
        const { prof_cod } = req.params
        const { username } = req.user

        // Comprobamos que el profesor sea del usuario
        const { valida } = await ProfesorModel.perteneceAUsuario({ prof_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })
        
        // Eliminamos el profesor
        await ProfesorModel.delete({ prof_cod })

        res.json({ message: 'Profesor eliminado' })
    }
}