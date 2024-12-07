import { host } from "../../../variables"

export const fetchConsultarHorario = async ({codigo}) => {
    const response = await fetch(`${host}/api/horario/${codigo}`, {
        method: 'GET',
        credentials: 'include',
    })
    const data = await response.json()
    return data
}