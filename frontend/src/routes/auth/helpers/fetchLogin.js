import { host } from "../../../variables"

export const fetchLogin = async ({ username, password }) => {
    try {
        const response = await fetch(`${host}/api/auth/login`, {
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

        console.log(response)

        if (!response.ok) {
            return true
        }
        return false
    } catch (error) {
        console.error('Error de red:', error)
    }
}