import { useState } from 'react'
import { Titulo3 } from '../../components/Titulo3'
import { fetchEliminarCarrera } from '../helpers/fetchEliminarCarrera'
import styles from './EditarCarrera.module.css'
import { EditarCurso } from './EditarCurso'
import { NombreCarreraEditable } from './NombreCarreraEditable'
import { NuevoCurso } from './NuevoCurso'
import { MiniValidacion } from '../../components/MiniValidacion'

export const EditarCarrera = ({ plantilla, setPlantilla, carrera }) => {
    const [validacion, setValidacion] = useState('')
    
    const handleClick = async () => {
        await fetchEliminarCarrera({ codigo: carrera.codigo })
        setPlantilla(plantilla => ({
            ...plantilla,
            carreras: plantilla.carreras.filter(el => el.codigo !== carrera.codigo)
        }))
    }
    
    return (
        <>
            <Titulo3>
                <span className={styles.titulo}>
                    <NombreCarreraEditable plantilla={plantilla} setPlantilla={setPlantilla} codigoCarrera={carrera.codigo} />
                    <button onClick={handleClick} className={styles.boton}><i className="fa-solid fa-trash"></i></button>
                    <NuevoCurso codigoCarrera={carrera.codigo} plantilla={plantilla} setPlantilla={setPlantilla} setValidacion={setValidacion} />
                    <MiniValidacion>{validacion}</MiniValidacion>
                </span>
            </Titulo3>
            <ul className={styles.ul}>
                {
                    (carrera.cursos.length !== 0)
                    ? carrera.cursos.map(curso => (
                        <EditarCurso key={curso.codigo} curso={curso} />
                    ))
                    : <p>No hay cursos</p>
                }
            </ul>
        </>
    )
}