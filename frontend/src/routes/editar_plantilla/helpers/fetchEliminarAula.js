import { host } from "../../../variables"

export const fetchEliminarAula = async ({ codigo }) => {
    const response = await fetch(`${host}/api/aula/${codigo}`, {
        method: 'DELETE',
        credentials: 'include'
    })

    return response.ok
}