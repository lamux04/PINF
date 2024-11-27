import { host } from "../../../variables"

export const fetchVerCurso = async ({ codigo }) => {
    const response = await fetch(`${host}/api/curso/${codigo}`, {
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