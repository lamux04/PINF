import styles from './EditarProfesores.module.css'

import { useState } from 'react'
import { Titulo2 } from '../../components/Titulo2'
import { NuevoProfesor } from './NuevoProfesor'
import { MiniValidacion } from '../../components/MiniValidacion'
import { EditarProfesor } from './EditarProfesor'

export const EditarProfesores = ({ plantilla, setPlantilla }) => {
    const [validacion, setValidacion] = useState('')

    return (
        <div className={styles.bloque_carreras}>
            <div className={styles.bloque_input}>
                <Titulo2>Profesores</Titulo2>
                <span className={styles.bloque_nuevo}>
                    <MiniValidacion>{validacion}</MiniValidacion>
                    <NuevoProfesor plantilla={plantilla} setPlantilla={setPlantilla} setValidacion={setValidacion} />
                </span>
            </div>
            <div className={styles.bloque}>
            {
                (plantilla.profesores.length !== 0) ?
                plantilla.profesores.map(profesores => (
                    <EditarProfesor key={profesores.codigo} profesor={profesores} plantilla={plantilla} setPlantilla={setPlantilla} />
                ))
                : <p>No hay profesores</p>
            }
            </div>
        </div>
    )
}