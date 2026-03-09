import { host } from "../../../variables"

export const fetchModificarNombreProfesor = ({ codigo, nombre, apellido1, apellido2 }) => {
    const response = fetch(`${host}/api/profesor/${codigo}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, apellido1, apellido2 })
    })

    return response.ok
}