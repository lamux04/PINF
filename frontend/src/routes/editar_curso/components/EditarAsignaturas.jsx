import styles from './EditarAsignaturas.module.css'

import { Titulo2 } from '../../components/Titulo2'
import { useState } from 'react'
import { MiniValidacion } from '../../components/MiniValidacion'
import { NuevaAsignatura } from './NuevaAsignatura'
import { EditarAsignatura } from './EditarAsignatura'

export const EditarAsignaturas = ({ curso, setCurso }) => {
    const [validacion, setValidacion] = useState('')

    const asignaturasOrdenadas = [...curso.asignaturas].sort((a, b) => a.nombre.localeCompare(b.nombre))

    return (
        <div className={styles.bloque_carreras}>
            <div className={styles.bloque_input}>
                <Titulo2>Asignaturas</Titulo2>
                <MiniValidacion>{validacion}</MiniValidacion>
                <NuevaAsignatura curso={curso} setCurso={setCurso} setValidacion={setValidacion} />
            </div>
            <div className={styles.bloque}>
            {
                (curso.asignaturas.length !== 0) ?
                asignaturasOrdenadas.map(el => (
                    <EditarAsignatura key={el.codigo} asignatura={el} curso={curso} setCurso={setCurso} />
                ))
                : <p>No hay carreras</p>
            }
            </div>
        </div>
    )
}