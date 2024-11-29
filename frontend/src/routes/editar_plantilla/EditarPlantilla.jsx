import { Menu } from '../components/Menu'
import { Main } from './components/Main'
import { useVerificarPlantilla } from '../ver_plantilla/hooks/useVerificarPlantilla'
import styles from './EditarPlantilla.module.css'

import { useParams } from 'react-router-dom'

export const EditarPlantilla = () => {
    const { codigo } = useParams()

    useVerificarPlantilla({ codigo })

    return (
        <>
            <Menu />
            <Main codigo={codigo} />
        </>
    )
}