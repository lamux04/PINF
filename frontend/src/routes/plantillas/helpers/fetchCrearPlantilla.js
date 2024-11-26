import { host } from "../../../variables"

export const fetchCrearPlantilla = async ({ nombre }) => {
    const response = await fetch(`${host}/api/plantilla`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre })
    })

    if (response.ok)
    {
        const data = await response.json()
        return { error: false, data }
    }
    else 
    {
        const data = await response.json()
        return { error: true, data }
    }
}