import { host } from "../../../../variables"

export const fetchAgregarHorario = async ({ codigo }) => {
    try {
        const response = await fetch(`${host}/api/horario/visualizar`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ horario: codigo })
        })

        if (!response.ok)
        {
            return { error: true, data: await response.json() }
        }
        return { error: false, data: await response.json() }
    } catch (error) {
        return error
    }
}