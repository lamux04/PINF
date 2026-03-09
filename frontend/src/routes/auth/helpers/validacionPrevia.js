export const validacionPrevia = ({ username, password }) => {
    if (username.length < 3)
        return 'El nombre de usuario debe tener al menos 3 caracteres'
    if (password.length < 6)
        return 'La contraseña debe tener al menos 6 caracteres'
    if (username.length > 30)
        return 'El nombre de usuario no puede tener más de 30 caracteres'
    if (password.length > 60)
        return 'La contraseña no puede tener más de 60 caracteres'
    return ''
}