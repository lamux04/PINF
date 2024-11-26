import { useContext, useEffect } from "react"
import { fetchVerificarPlantilla } from "../helpers/fetchVerificarPlantilla"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../../context/UserContext"

export const useVerificarPlantilla = ({ codigo }) => {
    const { setUsername } = useContext(UserContext)

    const navigator = useNavigate()

    const verificarPlantilla = async (codigo) => {
        const response = await fetchVerificarPlantilla({ codigo })
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
        verificarPlantilla(codigo)
    })    
}