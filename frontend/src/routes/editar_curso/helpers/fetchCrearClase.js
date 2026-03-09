import { host } from "../../../variables"

export const fetchCrearClase = async ({ asignatura, descripcion, tipo, tipo_aula, duracion, profesor, importante }) => {
    const res = await fetch(`${host}/api/clase`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            asignatura: asignatura,
            descripcion: descripcion,
            tipo: tipo,
            tipo_aula: tipo_aula,
            duracion: parseInt(duracion),
            profesor: profesor,
            importante: importante
        })
    })
    const data = await res.json()
    return data
}