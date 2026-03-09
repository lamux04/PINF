import { host } from "../../../variables"

export const fetchCrearCurso = async ({ nombre, carrera }) => {
    const response = await fetch(`${host}/api/curso/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, carrera })
    })

    const data = await response.json()

    return data
}