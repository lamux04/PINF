import { useEffect, useState } from "react"
import { host } from "../../../variables"

export const useTiposAulas = ({ codigoCurso }) => {
    const [tiposAulas, setTiposAulas] = useState([])

    const consultarTiposAulas = async ({ codigoCurso }) => {
        const resP = await fetch(`${host}/api/curso/ver_plantilla/${codigoCurso}`, {
            method: 'GET',
            credentials: 'include',
        })
        const dataP = await resP.json()
        const query = new URLSearchParams({ plantilla: dataP.plant_cod })
        const res = await fetch(`${host}/api/aula?${query}`, {
            method: 'GET',
            credentials: 'include',
        })
        const data = await res.json()
        const tipos = []
        for (const aula of data.aulas) 
            if (!tipos.includes(aula.tipo))
                tipos.push(aula.tipo)
        setTiposAulas(tipos)
    }

    useEffect(() => {
        consultarTiposAulas({ codigoCurso })
    }, [codigoCurso])

    return { tiposAulas }
}