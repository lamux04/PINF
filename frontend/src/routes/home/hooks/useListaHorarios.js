import { useEffect, useState } from "react"
import { fetchListaHorarios } from "../../helpers/fetchListaHorarios"

export const useListaHorarios = () => {
    const [horarios, setHorarios] = useState([])
    const [hayHorarios, setHayHorarios] = useState(false)

    

    useEffect(() => {
        if (horarios.length > 0) {
            setHayHorarios(true)
        }
    }, [horarios])

    useEffect(() => {
        fetchListaHorarios({ setHorarios})
    }, [])

    return { horarios, hayHorarios }
}