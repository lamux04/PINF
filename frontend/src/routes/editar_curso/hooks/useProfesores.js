import { useEffect, useState } from "react"
import { host } from "../../../variables"

export const useProfesores = ({ codigoCurso }) => {
    const [profesores, setProfesores] = useState([])

    const consultarProfesores = async ({ codigoCurso }) => {
        const resP = await fetch(`${host}/api/curso/ver_plantilla/${codigoCurso}`, {
            method: 'GET',
            credentials: 'include',
        })
        const dataP = await resP.json()
        const query = new URLSearchParams({ plantilla: dataP.plant_cod })
        const res = await fetch(`${host}/api/profesor?${query}`, {
            method: 'GET',
            credentials: 'include',
        })
        const data = await res.json()
        setProfesores(data.profesores)
    }

    useEffect(() => {
        consultarProfesores({ codigoCurso })
    }, [codigoCurso])

    return { profesores }
}