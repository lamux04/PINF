import { host } from "../../../../variables"

export const fetchListaHorarios = async ({ setHorarios }) => {
    try {
        const response = await fetch(`${host}/api/horario`, {
            method: 'GET',
            credentials: 'include'
        })

        const data = await response.json()
        setHorarios(data.horarios)
        return data
    } catch (error) {
        return error
    }
}