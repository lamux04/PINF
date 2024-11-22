import { host } from "../../../variables"

export const fetchRegister = async ({ username, password }) => {
    try {
        const response = await fetch(`${host}/api/auth/register`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })

        if (!response.ok) {
            return true
        }
        return false
    } catch (error) {
        console.error('Error de red:', error)
    }
}