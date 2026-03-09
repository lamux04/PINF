import { host } from "../../../variables"

export const fetchModificarNombreCurso = async ({ codigo, nombre }) => {
    const response = await fetch(`${host}/api/curso/${codigo}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ nombre })
    })

    return response.ok
}