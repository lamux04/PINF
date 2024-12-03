import styles from './EditarAsignatura.module.css'

import { useState } from 'react'
import { Titulo3 } from '../../components/Titulo3'
import { MiniValidacion } from '../../components/MiniValidacion'
import { NombreAsignaturaEditable } from './NombreAsignaturaEditable'
import { NuevaClase } from './NuevaClase'
import { EditarClase } from './EditarClase'

export const EditarAsignatura = ({ asignatura, curso, setCurso}) => {
    const [validacion, setValidacion] = useState('')

    return (
        <>
            <Titulo3>
                <span className={styles.titulo}>
                    <span className={styles.titulo}>
                        <NombreAsignaturaEditable curso={curso} setCurso={setCurso} asignatura={asignatura} />
                    </span>
                </span>
            </Titulo3>
            <span className={styles.agregar}>
                <MiniValidacion>{validacion}</MiniValidacion>
                <NuevaClase asignatura={asignatura} curso={curso} setCurso={setCurso} setValidacion={setValidacion} />
            </span>
            <p>Aprobable: {asignatura.aprobabilidad ? 'SI' : 'NO'}</p>
            <ul className={styles.ul}>
                {
                    (asignatura.clases.length !== 0)
                    ? asignatura.clases.map(clase => (
                        <EditarClase key={clase.codigo} curso={curso} setCurso={setCurso} clase={clase} codigoAsignatura={asignatura.codigo} />
                    ))
                    : <p>No hay clases</p>
                }
            </ul>
        </>
    )
}