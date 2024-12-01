import { host } from "../../../variables"

export const fetchCrearAula = async ({ plantilla, nombre, tipo }) => {
    const response = await fetch(`${host}/api/aula`, {
        method: 'POST',
        credentials: 'include', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ plantilla, nombre, tipo })
    })

    return await response.json();
}