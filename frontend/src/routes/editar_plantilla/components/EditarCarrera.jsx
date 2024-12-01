import styles from './EditarCarrera.module.css'

import { useState } from 'react'
import { Titulo3 } from '../../components/Titulo3'
import { EditarCurso } from './EditarCurso'
import { NombreCarreraEditable } from './NombreCarreraEditable'
import { NuevoCurso } from './NuevoCurso'
import { MiniValidacion } from '../../components/MiniValidacion'

export const EditarCarrera = ({ plantilla, setPlantilla, carrera }) => {
    const [validacion, setValidacion] = useState('')

    return (
        <>
            <Titulo3>
                <span className={styles.titulo}>
                    <span className={styles.titulo}>
                        <NombreCarreraEditable plantilla={plantilla} setPlantilla={setPlantilla} codigoCarrera={carrera.codigo} />
                    </span>
                    <span className={styles.agregar}>
                        <MiniValidacion>{validacion}</MiniValidacion>
                        <NuevoCurso codigoCarrera={carrera.codigo} plantilla={plantilla} setPlantilla={setPlantilla} setValidacion={setValidacion} />
                    </span>
                </span>
            </Titulo3>
            <ul className={styles.ul}>
                {
                    (carrera.cursos.length !== 0)
                    ? carrera.cursos.map(curso => (
                        <EditarCurso key={curso.codigo} curso={curso} plantilla={plantilla} setPlantilla={setPlantilla} codigoCarrera={carrera.codigo} />
                    ))
                    : <p>No hay cursos</p>
                }
            </ul>
        </>
    )
}