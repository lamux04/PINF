export const validacionPrevia = ({ username, password }) => {
    if (username.length < 3)
        return 'El nombre de usuario debe tener al menos 3 caracteres'
    if (password.length < 6)
        return 'La contraseña debe tener al menos 6 caracteres'
    return ''
}