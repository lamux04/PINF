import { useNavigate } from 'react-router-dom'
import styles from './EditarCurso.module.css'

export const EditarCurso = ({ curso }) => {
    const navigator = useNavigate()

    return (
        <li key={curso.codigo} className={styles.li}>
            <span>{curso.nombre}</span>
            <span className={styles.botones}>
                <button className={styles.editar} onClick={() => navigator(`/editar_cursos/${curso.codigo}`)}><i className="fa-solid fa-pen"></i></button>
                <button className={styles.borrar} onClick={() => navigator(`/editar_cursos/${curso.codigo}`)}><i className="fa-solid fa-trash"></i></button>
            </span>
        </li>
    )
}