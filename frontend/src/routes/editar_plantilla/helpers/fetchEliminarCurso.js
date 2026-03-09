import { host } from "../../../variables"

export const fetchEliminarCurso = async ({ codigo }) => {
    const response = await fetch(`${host}/api/curso/${codigo}`, {
        method: 'DELETE',
        credentials: 'include'
    })

    return response.ok
}