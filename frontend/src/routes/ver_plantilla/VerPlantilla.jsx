import { useParams } from "react-router-dom"
import { useVerificarPlantilla } from "./hooks/useVerificarPlantilla"
import { Menu } from '../components/Menu'
import { Main } from './components/Main'

export const VerPlantilla = () => {
    const { codigo } = useParams()

    useVerificarPlantilla({ codigo })

    return (
        <>
            <Menu />
            <Main codigo={codigo} />
        </>
    )
}