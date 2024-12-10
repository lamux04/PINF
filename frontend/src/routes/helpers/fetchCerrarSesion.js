import { host } from "../../variables"

export const fetchCerrarSesion = async () => {
    try {
        await fetch(`${host}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        })
    } catch (error) {
        return error
    }
}