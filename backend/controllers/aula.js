import { AulaModel } from "../models/aula.js"

export class AulaController
{
    static async getAll(req, res) 
    {
        const response = await AulaModel.getAll()
        res.json(response.aulas)
    }

    static async getByCodigo(req, res)
    {
        const { codigo } = req.params
        const aula = await AulaModel.getByCodigo(codigo)
        res.json(aula)
    }
    
}