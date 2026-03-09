import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../../context/UserContext"
import { fetchVerificarHorario } from "../helpers/fetchVerificarHorario"

export const useVerificarHorario = ({ codigo }) => {
    const { setUsername } = useContext(UserContext)

    const navigator = useNavigate()

    const verificarHorario = async (codigo) => {
        const response = await fetchVerificarHorario({ codigo })
        if (response.error) {
            if (response.data.message === 'Token no provisto' || response.data.message === 'Token invalido') {
                navigator('/auth')
            } else if (response.data.message === 'El usuario no puede ver el horario') {
                navigator('/home')
            } 
        } else {
            setUsername(response.data.username)
        }
    }

    useEffect(() => {
        verificarHorario(codigo)
    })
}