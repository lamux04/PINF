import { host } from "../../../variables"

export const fetchCrearProfesor = async ({ plantilla, nombre, apellido1, apellido2 }) => {
    const response = await fetch(`${host}/api/profesor`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ plantilla, nombre, apellido1, apellido2 })
    })

    return await response.json()
}