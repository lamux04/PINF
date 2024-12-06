import { useParams } from "react-router-dom"
import { Menu } from '../components/Menu'
import { Main } from './components/Main'

export const Horario = () => {
    const { codigo } = useParams()

    return (
        <>
            <Menu />
            <Main codigo={codigo} />
        </>
    )
}