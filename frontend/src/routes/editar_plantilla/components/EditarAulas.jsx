import styles from './EditarAulas.module.css'

import { useState } from 'react'
import { Titulo2 } from '../../components/Titulo2'
import { MiniValidacion } from '../../components/MiniValidacion'
import { NuevaAula } from './NuevaAula'
import { EditarAula } from './EditarAula'

export const EditarAulas = ({ plantilla, setPlantilla }) => {
    const [validacion, setValidacion] = useState('')

    return (
        <div className={styles.bloque_carreras}>
            <div className={styles.bloque_input}>
                <Titulo2>Aulas</Titulo2>
                <span className={styles.bloque_nuevo}>
                    <MiniValidacion>{validacion}</MiniValidacion>
                    <NuevaAula plantilla={plantilla} setPlantilla={setPlantilla} setValidacion={setValidacion} />
                </span>
            </div>
            <div className={styles.bloque}>
            {
                (plantilla.aulas.length !== 0) ?
                plantilla.aulas.map(aula => (
                    <EditarAula key={aula.codigo} aula={aula} plantilla={plantilla} setPlantilla={setPlantilla} />
                ))
                : <p>No hay aulas</p>
            }
            </div>
        </div>
    )
}