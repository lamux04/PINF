import { host } from "../../../variables"

export const fetchHorariosGenerados = async ({ codigo }) => {
    const res = await fetch(`${host}/api/horario/horarios_generados/${codigo}`, {
        method: 'GET',
        credentials: 'include'
    })
    const data = await res.json()

    return { horarios: data.horarios }
}