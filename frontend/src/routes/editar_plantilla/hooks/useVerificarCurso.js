import { useContext, useEffect } from "react"
import { UserContext } from "../../../context/UserContext"
import { useNavigate } from "react-router-dom"
import { fetchVerificarCurso } from "../../ver_curso/helpers/fetchVerificarCurso"

export const useVerificarCurso = ({ codigo }) => {
    const { setUsername } = useContext(UserContext)

    const navigator = useNavigate()

    const verificarCurso = async (codigo) => {
        const response = await fetchVerificarCurso({ codigo })
        if (response.error) {
            if (response.data.message === 'Token no provisto' || response.data.message === 'Token invalido') {
                navigator('/auth')
            } else if (response.data.message === 'Plantilla no encontrada') {
                navigator('/plantillas')
            } 
        } else {
            setUsername(response.data.username)
        }
    }

    useEffect(() => {
        verificarCurso(codigo)
    })    
}