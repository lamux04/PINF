import { host } from "../../../variables"

export const fetchModificarNombre = async ({codigo, nombre}) => {
    const response = await fetch(`${host}/api/plantilla/${codigo}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre })
    })

    if (!response.ok)
        return false
    else
        return true

}