import { host } from "../../../variables"

export const fetchEliminarCarrera = async ({ codigo }) => {
    const response = await fetch(`${host}/api/carrera/${codigo}`, {
        method: 'DELETE',
        credentials: 'include'
    })

    return response.ok
}