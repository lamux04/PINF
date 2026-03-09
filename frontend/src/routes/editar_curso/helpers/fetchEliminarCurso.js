import { host } from "../../../variables"

export const fetchEliminarCurso = async ({ codigo }) => {
    const res = await fetch(`${host}/api/clase/${codigo}`, {
        method: 'DELETE',
        credentials: 'include',
    })
    return res.ok
}