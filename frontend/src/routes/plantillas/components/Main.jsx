import { Titulo } from '../../components/Titulo'
import { usePlantillas } from '../hooks/usePlantillas'
import { ListaPlantillas } from './ListaPlantillas'
import { Atras } from '../../components/Atras'

import styles from './Main.module.css'
import { NuevaPlantilla } from './NuevaPlantilla'
import { useNavigate } from 'react-router-dom'

export const Main = () => {
    const { plantillas, hayPlantillas, eliminarPlantilla, crearPlantilla } = usePlantillas();
    const navigator = useNavigate()

    return (
        <main className={styles.bloque_principal}>
            <Atras onClick={() => navigator('/home')}/>
            <div className={styles.main}>
                <Titulo>Mis plantillas</Titulo>
                <ListaPlantillas plantillas={plantillas} hayPlantillas={hayPlantillas} eliminarPlantilla={eliminarPlantilla} />
                <NuevaPlantilla plantillas={plantillas} crearPlantilla={crearPlantilla} />
            </div>
        </main>
    )
}