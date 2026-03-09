import { host } from "../../../../variables"

export const fetchEliminarHorario = async ({ codigo }) => {
    try {
        const response = await fetch(`${host}/api/horario/visualizar`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ horario: codigo })
        })

        const data = await response.json()
        return data
    } catch (error) {
        return error
    }
}