import { useNavigate } from 'react-router-dom'
import styles from './EditarCurso.module.css'
import { NombreCursoEditable } from './NombreCursoEditable'
import { fetchEliminarCurso } from '../helpers/fetchEliminarCurso'

export const EditarCurso = ({ curso, plantilla, setPlantilla, codigoCarrera }) => {
    const navigator = useNavigate()

    const handleEliminar = () => {
        fetchEliminarCurso({ codigo: curso.codigo })
        setPlantilla(() => ({
            ...plantilla,
            carreras: plantilla.carreras.map(carrera => (carrera.codigo === codigoCarrera)
                ? { ...carrera, cursos: carrera.cursos.filter((el) => el.codigo !== curso.codigo) }
                : carrera
            )
        }))
    }

    return (
        <li key={curso.codigo} className={styles.li}>
            <span>
                <NombreCursoEditable curso={curso} plantilla={plantilla} setPlantilla={setPlantilla} codigoCarrera={codigoCarrera}/>
            </span>
            <span className={styles.botones}>
                <button className={styles.editar} onClick={() => navigator(`/modificar_curso/${curso.codigo}`)}><i className="fa-solid fa-pen"></i></button>
                <button disabled className={styles.borrar} onClick={handleEliminar}><i className="fa-solid fa-trash"></i></button>
            </span>
        </li>
    )
}