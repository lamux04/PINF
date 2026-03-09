import { host } from "../../../variables"

export const fetchVerPlantilla = async ({ codigo }) => {
    const response = await fetch(`${host}/api/plantilla/ver_plantilla/${codigo}`, {
        method: 'GET',
        credentials: 'include',
    })

    if (response.ok) {
        const data = await response.json()
        return data
    } else {
        return null
    }
}