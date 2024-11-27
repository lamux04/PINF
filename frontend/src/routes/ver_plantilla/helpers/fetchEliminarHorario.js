import { host } from "../../../variables"

export const fetchEliminarHorario = async ({ codigo }) => {
    const response = await fetch(`${host}/api/horario/${codigo}`, {
        method: 'DELETE',
        credentials: 'include'
    })

    if (response.ok)
        return true
    return false
}