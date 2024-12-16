import { useState } from 'react'
import styles from './EditarCarreras.module.css'

import { Titulo2 } from '../../components/Titulo2'
import { NuevaCarrera } from './NuevaCarrera'
import { MiniValidacion } from '../../components/MiniValidacion'
import { EditarCarrera } from './EditarCarrera'

export const EditarCarreras = ({ plantilla, setPlantilla }) => {
    const [validacion, setValidacion] = useState('')
    const carrerasOrdenadas = [...plantilla.carreras].sort((a, b) => a.nombre.localeCompare(b.nombre))

    return (
        <div className={styles.bloque_carreras}>
            <div className={styles.bloque_input}>
                <Titulo2>Carreras</Titulo2>
                <NuevaCarrera plantilla={plantilla} setPlantilla={setPlantilla} setValidacion={setValidacion} />
                <MiniValidacion>{validacion}</MiniValidacion>
            </div>
            <div className={styles.bloque}>
            {
                (plantilla.carreras.length !== 0) ?
                carrerasOrdenadas.map(el => (
                    <EditarCarrera key={el.codigo} carrera={el} plantilla={plantilla} setPlantilla={setPlantilla} />
                ))
                : <p>No hay carreras</p>
            }
            </div>
        </div>
    )
}