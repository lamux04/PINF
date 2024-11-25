import { host } from "../../../variables"

export const fetchEliminarPlantilla = async (codigo) => {
    try {
        const response = await fetch(`${host}/api/plantilla/${codigo}`, {
            method: 'DELETE',
            credentials: 'include',
        })

        if (!response.ok) {
            return false
        }
        return true
    } catch (error) {
        return error
    }
}