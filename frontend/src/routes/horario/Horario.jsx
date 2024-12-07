import { useParams } from "react-router-dom"
import { Menu } from '../components/Menu'
import { Main } from './components/Main'
import { useVerificarHorario } from './hooks/useVerificarHorario'

export const Horario = () => {
    const { codigo } = useParams()

    useVerificarHorario({ codigo })

    return (
        <>
            <Menu />
            <Main codigo={codigo} />
        </>
    )
}