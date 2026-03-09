import { host } from "../../../variables"

export const fetchModificarNombreCarrera = async ({ codigo, nombre }) => {
    const response = await fetch(`${host}/api/carrera/${codigo}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombre})
    })

    return response.ok
}