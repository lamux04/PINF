import { host } from "../../../variables"

export const fetchVerificarPlantilla = async ({ codigo }) => {
    const response = await fetch(`${host}/api/plantilla/verificar/${codigo}`, {
        method: "GET",
        credentials: "include",
    })

    const data = await response.json()
    if (!response.ok) {
        return { error: true, data }
    } else {
        return { error: false, data}
    }
}