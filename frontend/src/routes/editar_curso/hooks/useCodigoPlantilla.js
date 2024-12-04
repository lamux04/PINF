import { useEffect, useState } from "react"
import { host } from "../../../variables"

export const useCodigoPlantilla = ({ codigoCurso }) => {
    const [codigoPlantilla, setCodigoPlantilla] = useState('')

    const consultarCodigoPlantilla = async ({ codigoCurso }) => {
        const res = await fetch(`${host}/api/curso/ver_plantilla/${codigoCurso}`, {
            method: 'GET',
            credentials: 'include',
        })
        const data = await res.json()
        setCodigoPlantilla(data.plantilla)
    }

    useEffect(() => {
        consultarCodigoPlantilla({ codigoCurso })
    }, [codigoCurso])

    return { codigoPlantilla }
}