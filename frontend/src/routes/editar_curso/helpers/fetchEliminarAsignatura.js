import { host } from "../../../variables"

export const fetchEliminarAsignatura = async ({ codigo }) => {
    const res = await fetch(`${host}/api/asignatura/${codigo}`, {
        method: 'DELETE',
        credentials: 'include',
    })
    return res.ok
}