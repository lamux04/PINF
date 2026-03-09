import { Titulo } from '../../components/Titulo'
import { usePlantillas } from '../../hooks/usePlantillas'
import { ListaPlantillas } from './ListaPlantillas'
import { Atras } from '../../components/Atras'

import styles from './Main.module.css'
import { NuevaPlantilla } from './NuevaPlantilla'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const Main = () => {
    const { plantillas, hayPlantillas, eliminarPlantilla, crearPlantilla } = usePlantillas();
    const navigator = useNavigate()
    const [plantillasOrdenadas, setPlantillasOrdenadas] = useState([])

    useEffect(() => {
        setPlantillasOrdenadas([...plantillas].sort((a, b) => a.nombre.localeCompare(b.nombre)))
    }, [plantillas])

    return (
        <main className={styles.bloque_principal}>
            <Atras onClick={() => navigator('/home')}/>
            <div className={styles.main}>
                <Titulo>Mis plantillas</Titulo>
                <ListaPlantillas plantillas={plantillasOrdenadas} hayPlantillas={hayPlantillas} eliminarPlantilla={eliminarPlantilla} />
                <NuevaPlantilla plantillas={plantillas} crearPlantilla={crearPlantilla} />
            </div>
        </main>
    )
}