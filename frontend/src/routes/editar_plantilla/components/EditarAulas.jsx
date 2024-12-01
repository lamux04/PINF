import styles from './EditarAulas.module.css'

import { useEffect, useState } from 'react'
import { Titulo2 } from '../../components/Titulo2'
import { MiniValidacion } from '../../components/MiniValidacion'
import { NuevaAula } from './NuevaAula'
import { EditarTipoAula } from './EditarTipoAula'

export const EditarAulas = ({ plantilla, setPlantilla }) => {
    const [validacion, setValidacion] = useState('')
    const [aulas, setAulas] = useState({})

    useEffect(() => {
        const nuevaAulas = {}
        for (let aula of plantilla.aulas)
        {
            if (nuevaAulas[aula.tipo])
                nuevaAulas[aula.tipo].push(aula)
            else
                nuevaAulas[aula.tipo] = [aula]
        }
        setAulas(nuevaAulas)
    }, [plantilla])

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
                (Object.keys(aulas).length !== 0) ?
                Object.keys(aulas).map(tipo => (
                    <EditarTipoAula key={tipo} tipoAula={tipo} aulas={aulas[tipo]} plantilla={plantilla} setPlantilla={setPlantilla} />
                ))
                : <p>No hay aulas</p>
            }
            </div>
        </div>
    )
}