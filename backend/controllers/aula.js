import { AulaModel } from "../models/aula.js"
import { PlantillaModel } from "../models/plantilla.js"

export class AulaController
{
    // GET /api/aula { plantilla }
    static async getAulas(req, res)
    {
        // Obtenemos los atributos de la plantilla
        const { plantilla: plant_cod } = req.body
        const { username } = req.user

        // Validamos los atributos
        if (!plant_cod) return res.status(400).json({ message: 'Plantilla es requerido' })
        
        // Comprobamos que la plantilla sea del usuario
        const { valida } = await PlantillaModel.perteneceAUsuario({ plant_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })
        
        // Obtenemos las aulas
        const { aulas } = await AulaModel.getByPlantilla({ plant_cod })

        res.json({ aulas })
    }

    // GET /api/aula/:aula_cod
    static async getAula(req, res)
    {
        // Obtenemos los atributos de la plantilla
        const { aula_cod } = req.params
        const { username } = req.user

        // Comprobamos que el aula sea del usuario
        const { valida } = await AulaModel.perteneceAUsuario({ aula_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })
        
        // Obtenemos el aula
        const { aula } = await AulaModel.getByCodigo({ aula_cod })

        res.json(aula)
    }

    // POST /api/aula { plantilla, nombre, tipo }
    static async createAula(req, res)
    {
        // Obtenemos los atributos
        const { plantilla: plant_cod, nombre: aula_nombre, tipo: aula_tipo } = req.body
        const { username } = req.user

        // Validamos los atributos
        if (!plant_cod) return res.status(400).json({ message: 'Plantilla es requerida' })
        if (!aula_nombre) return res.status(400).json({ message: 'Nombre es requerido' })
        if (!aula_tipo) return res.status(400).json({ message: 'Tipo es requerido' })
        
        // Comprobamos que la plantilla sea del usuario
        const { valida } = await PlantillaModel.perteneceAUsuario({ plant_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })
        
        // Creamos el aula
        const { aula_cod } = await AulaModel.create({ plant_cod, aula_nombre, aula_tipo })

        res.json({ codigo: aula_cod, nombre: aula_nombre, tipo: aula_tipo })
    }

    // PATCH /api/aula/:aula_cod { nombre, tipo }   Elimina todos los horarios asociados a la plantilla
    static async updateAula(req, res)
    {
        // Obtenemos los atributos
        const { nombre: aula_nombre, tipo: aula_tipo } = req.body
        const { aula_cod } = req.params
        const { username } = req.user

        // Comprobamos que el aula sea del usuario
        const { valida, plant_cod } = await AulaModel.perteneceAUsuario({ aula_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })
        
        // Obtenemos el aula
        const { aula } = await AulaModel.getByCodigo({ aula_cod })

        const nuevaAula = {
            aula_cod: aula_cod,
            aula_nombre: aula_nombre ?? aula['nombre'],
            aula_tipo: aula_tipo ?? aula['tipo']
        }

        // Actualizamos el aula
        await AulaModel.update(nuevaAula)

        // Eliminamos todos los horarios de la plantilla
        await PlantillaModel.deleteHorarios({ plant_cod })

        res.json({ codigo: nuevaAula.aula_cod, nombre: nuevaAula.aula_nombre, tipo: nuevaAula.aula_tipo })
    }

    // DELETE /api/aula/:aula_cod   Elimina todos los horarios asociados a la plantilla
    static async deleteAula(req, res)
    {
        // Obtenemos los atributos
        const { aula_cod } = req.params
        const { username } = req.user

        // Comprobamos que el aula sea del usuario
        const { valida, plant_cod } = await AulaModel.perteneceAUsuario({ aula_cod, username })
        if (!valida) return res.status(401).json({ message: 'No autorizado' })
        
        // Eliminamos el aula
        await AulaModel.delete({ aula_cod })

        // Eliminamos todos los horarios de la plantilla
        await PlantillaModel.deleteHorarios({ plant_cod })

        res.json({ message: 'Aula eliminada' })
    }
}