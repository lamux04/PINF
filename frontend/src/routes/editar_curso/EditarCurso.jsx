import styles from './EditarCurso.module.css'

import { Menu } from '../components/Menu'
import { Main } from './components/Main'

import { useParams } from 'react-router-dom'
import { useVerificarCurso } from '../editar_plantilla/hooks/useVerificarCurso'

export const EditarCurso = () => {
    const { codigo } = useParams()

    useVerificarCurso({ codigo })

    return (
        <>
            <Menu />
            <Main />
        </>
    )

}