import { useEffect, useState } from "react"
import { fetchHorariosGenerados } from "../helpers/fetchHorariosGenerados"

export const useHorarios = ({ codigo }) => {
    const [horarios, setHorarios] = useState([])
    const [hayHorarios, setHayHorarios] = useState(false)

    const effectHorariosGenerados = async ({ codigo }) => {
        const { horarios } = await fetchHorariosGenerados({ codigo })
        setHorarios(horarios)
    }

    useEffect(() => {
        effectHorariosGenerados({ codigo })
    }, [codigo])

    useEffect(() => {
        if (horarios.length === 0)
            setHayHorarios(false)
        else
            setHayHorarios(true)
    }, [horarios])

    const agregarHorario = ({ codigo, nombre }) => {
        setHorarios([...horarios, { codigo, nombre }])
    }

    const quitarHorario = (codigo) => {
        setHorarios(horarios.filter(el => el.codigo !== codigo))
    }

    return { horarios, hayHorarios, agregarHorario, quitarHorario }

}