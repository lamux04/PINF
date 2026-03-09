import { host } from "../../../variables"

export const fetchEliminarProfesor = async ({ codigo }) => {
    const response = await fetch(`${host}/api/profesor/${codigo}`, {
        method: 'DELETE',
        credentials: 'include'
    })

    return response.ok
}