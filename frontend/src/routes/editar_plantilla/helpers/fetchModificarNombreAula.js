import { host } from "../../../variables"

export const fetchModificarNombreAula = async ({ codigo, nombre }) => {
    const response = await fetch(`${host}/api/aula/${codigo}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombre})
    })

    return response.ok
}