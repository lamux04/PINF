import { useEffect, useState } from "react"
import { fetchListaHorarios } from "../helpers/fetchListaHorarios"

export const useListaHorarios = () => {
    const [horarios, setHorarios] = useState([])
    const [hayHorarios, setHayHorarios] = useState(false)

    useEffect(() => {
        if (horarios.length > 0) {
            setHayHorarios(true)
        } else {
            setHayHorarios(false)
        }
    }, [horarios])

    useEffect(() => {
        fetchListaHorarios({ setHorarios })
    }, [])

    const quitarHorario = (codigo) => {
        setHorarios(horarios.filter(el => el.codigo !== codigo))
    }

    const agregarHorario = (horario) => {
        horario = {
            codigo: horario.codigo,
            nombre: horario.nombre
        }

        if (!horarios.find(el => el.codigo === horario.codigo))
            setHorarios([...horarios, horario])
    }

    return { horarios, hayHorarios, quitarHorario, agregarHorario }
}