import { host } from "../../../variables"

export const fetchCrearAsignatura = async ({ curso, nombre, aprobabilidad }) => {
    const response = await fetch(`${host}/api/asignatura`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({curso, nombre, aprobabilidad })
    })
    const data = await response.json()
    return data
}