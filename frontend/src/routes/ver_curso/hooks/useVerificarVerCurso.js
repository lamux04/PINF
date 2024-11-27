import { useContext, useEffect } from "react"
import { UserContext } from "../../../context/UserContext"
import { useNavigate } from "react-router-dom"
import { fetchVerificarCurso } from "../helpers/fetchVerificarCurso"

export const useVerificarVerCurso = ({ codigo }) => {
    const { setUsername } = useContext(UserContext)

    const navigator = useNavigate()

    const verificarPlantilla = async (codigo) => {
        const response = await fetchVerificarCurso({ codigo })
        if (response.error) {
            if (response.data.message === 'Token no provisto' || response.data.message === 'Token invalido') {
                navigator('/auth')
            } else if (response.data.message === 'Curso no encontrado') {
                navigator('/plantillas')
            } 
        } else {
            setUsername(response.data.username)
        }
    }

    useEffect(() => {
        verificarPlantilla(codigo)
    })  
}