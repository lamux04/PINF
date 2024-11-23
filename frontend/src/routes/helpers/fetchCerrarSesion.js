export const fetchCerrarSesion = async () => {
    try {
        await fetch('http://localhost:1234/api/auth/logout', {
            method: 'POST',
            credentials: 'include'
        })
    } catch (error) {
        console.error(error)
        return error
    }
}