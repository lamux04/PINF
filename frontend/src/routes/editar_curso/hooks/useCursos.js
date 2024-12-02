import { useEffect, useState } from "react"
import { host } from "../../../variables"

export const useCursos = ({ codigoCurso }) => {
    const [cursos, setCursos] = useState([])

    const encontrarCursos = async ({ codigoCurso }) => {
        const response = await fetch(`${host}/api/curso/consultar_cursos/${codigoCurso}`, {
            method: 'GET',
            credentials: 'include'
        })

        const data = await response.json()

        setCursos(data.cursos)
    }

    useEffect(() => {
        encontrarCursos({ codigoCurso })
    }, [codigoCurso])

    const cambiarNombre = ({ codigo, nombre }) => {
        setCursos(cursos.map(el => el.codigo === codigo ? { codigo, nombre } : el))
    }

    return { cursos, cambiarNombre }
}