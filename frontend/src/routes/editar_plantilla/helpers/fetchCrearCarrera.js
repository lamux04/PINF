import { host } from "../../../variables"

export const fetchCrearCarrera = async ({ nombre, plantilla }) => {
    const response = await fetch(`${host}/api/carrera/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, plantilla })
    })

    const data = response.json()
    return data
}