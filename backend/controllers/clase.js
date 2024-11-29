import { AsignaturaModel } from "../models/asignatura.js"
import { ClaseModel } from "../models/clase.js"
import { PlantillaModel } from "../models/plantilla.js"
import { ProfesorModel } from "../models/profesor.js"

export class ClaseController
{
    // GET /api/clase { asignatura: string }
    static async getClases(req, res)
    {
        // Obtenemos los atributos
        const { asignatura: asig_cod } = req.body
        const { username } = req.user

        // Validamos los atributos
        if (!asig_cod) return res.status(400).json({ message: 'Asignatura es requerida' })
        
        // Comprobamos que la asignatura sea del usuario
        const { valida } = await AsignaturaModel.perteneceAUsuario({ asig_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })
        
        // Obtenemos las clases
        const { clases } = await ClaseModel.getByAsignatura({ asig_cod })

        res.json({ clases })
    }

    // GET /api/clase/:clase_cod
    static async getClase(req, res)
    {
        // Obtenemos los atributos
        const { clase_cod } = req.params
        const { username } = req.user

        // Comprobamos que la clase sea del usuario
        const { valida } = await ClaseModel.perteneceAUsuario({ clase_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })

        // Obtenemos la clase
        const { clase } = await ClaseModel.getByCodigo({ clase_cod })

        res.json(clase)
    }

    // POST /api/clase { descripcion: string, tipo: string, tipo aula: string, duracion: int, profesor codigo: string, importante: int }
    static async postClase(req, res)
    {
        // Obtenemos los atributos
        const { descripcion, tipo, tipo_aula, duracion, profesor, asignatura: asig_cod, importante } = req.body
        const { username } = req.user

        // Validamos los atributos
        if (!descripcion) return res.status(400).json({ message: 'Descripcion es requerida' })
        if (!tipo) return res.status(400).json({ message: 'Tipo es requerido' })
        if (!tipo_aula) return res.status(400).json({ message: 'Tipo aula es requerido' })
        if (!duracion) return res.status(400).json({ message: 'Duracion es requerida' })
        if (!profesor) return res.status(400).json({ message: 'Profesor es requerido' })
        if (!asig_cod) return res.status(400).json({ message: 'Asignatura es requerida' })
        if (importante === undefined) return res.status(400).json({ message: 'Importante es requerido' })
            
        // Comprobamos que la asignatura sea del usuario
        const { valida, plant_cod } = await AsignaturaModel.perteneceAUsuario({ asig_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })
        
        // Comprobamos que el profesor exista y que pertenezca a la plantilla
        const { valida: validop } = await ProfesorModel.existe({ prof_cod: profesor, plant_cod })
        if (!validop) return res.status(400).json({ message: 'Profesor no existe' })
        
        // Insertamos la clase
        const { clase_cod } = await ClaseModel.create({ clase_descrip: descripcion, clase_tipo: tipo, clase_tipo_aula: tipo_aula, clase_duracion: duracion, prof_cod: profesor, asig_cod, clase_importante: importante })

        // Eliminamos todos los horarios de la plantilla
        await PlantillaModel.deleteHorarios({ plant_cod })

        res.json({ codigo: clase_cod, descripcion, tipo, tipo_aula, duracion, profesor, importante })
    }

    // PATCH /api/clase/:clase_cod { descripcion: string, tipo: string, tipo aula: string, duracion: int, profesor codigo: string }
    static async patchClase(req, res)
    {
        // Obtenemos los atributos
        const { descripcion, tipo, tipo_aula, duracion, profesor, importante } = req.body
        const { clase_cod } = req.params
        const { username } = req.user
        
        // Comprobamos que la clase sea del usuario
        const { valida, plant_cod } = await ClaseModel.perteneceAUsuario({ clase_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })
        
        if (profesor)
        {
            // Comprobamos que el profesor exista
            const { valida: validop } = await ProfesorModel.existe({ prof_cod: profesor, plant_cod })
            if (!validop) return res.status(400).json({ message: 'Profesor no existe' })
        }
        
        // Obtenemos solo la clase
        const { clase } = await ClaseModel.getByCodigo({ clase_cod })

        const nuevaClase = {
            clase_cod: clase['codigo'],
            clase_descrip: descripcion ?? clase['descripcion'],
            clase_tipo: tipo ?? clase['tipo'],
            clase_tipo_aula: tipo_aula ?? clase['tipo aula'],
            clase_duracion: duracion ?? clase['duracion'],
            prof_cod: profesor ?? clase['codigo profesor'],
            clase_importante: importante ?? clase['importante']
        }
        
        // Actualizamos la clase
        await ClaseModel.update(nuevaClase)

        // Eliminamos todos los horarios de la plantilla
        // await PlantillaModel.deleteHorarios({ plant_cod })

        res.json({ codigo: nuevaClase['clase_cod'], descripcion: nuevaClase['clase_descrip'], tipo: nuevaClase['clase_tipo'], tipo_aula: nuevaClase['clase_tipo_aula'], duracion: nuevaClase['clase_duracion'], profesor: nuevaClase['prof_cod'], importante: nuevaClase['clase_importante'] })
    }

    // DELETE /api/clase/:clase_cod
    static async deleteClase(req, res)
    {
        // Obtenemos los atributos
        const { clase_cod } = req.params
        const { username } = req.user

        // Comprobamos que la clase sea del usuario
        const { valida, plant_cod } = await ClaseModel.perteneceAUsuario({ clase_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })

        // Eliminamos la clase
        await ClaseModel.delete({ clase_cod })

        // Eliminamos todos los horarios de la plantilla
        await PlantillaModel.deleteHorarios({ plant_cod })

        res.json({ message: 'Clase eliminada' })
    }
}