import styles from './VerCurso.module.css'

import { Menu } from '../components/Menu'
import { Main } from './components/Main'
import { useParams } from 'react-router-dom'
import { useVerificarVerCurso } from './hooks/useVerificarVerCurso'

export const VerCurso = () => {
    const { codigo } = useParams()

    useVerificarVerCurso({ codigo })

    return (
        <>
            <Menu />
            <Main codigo={codigo} />
        </>
    )
}