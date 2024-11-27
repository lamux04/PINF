import { host } from "../../../variables"

export const fetchVerificarCurso = async ({ codigo }) => {
    const response = await fetch(`${host}/api/curso/verificar/${codigo}`, {
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