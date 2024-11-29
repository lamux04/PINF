import { Titulo3 } from '../../components/Titulo3'
import styles from './EditarCarrera.module.css'
import { EditarCurso } from './EditarCurso'
import { NombreCarreraEditable } from './NombreCarreraEditable'

export const EditarCarrera = ({ plantilla, setPlantilla, carrera}) => {
    return (
        <>
            <Titulo3><NombreCarreraEditable plantilla={plantilla} setPlantilla={setPlantilla} codigoCarrera={carrera.codigo} /></Titulo3>
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