import { host } from "../../../variables"

export const fetchModificarNombreAsignatura = async ({codigo, nombre}) => {
    const response = await fetch(`${host}/api/asignatura/${codigo}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombre})
    })

    return response.ok
}