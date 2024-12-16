import { useNavigate } from 'react-router-dom'
import { Titulo2 } from '../../components/Titulo2'
import styles from './VerCarreras.module.css'
import { useEffect, useState } from 'react'

export const VerCarreras = ({ carreras }) => {
    const [carrerasOrdenadas, setCarrerasOrdenadas] = useState([])
    const navigator = useNavigate()

    useEffect(() => {
        setCarrerasOrdenadas([...carreras].sort((a, b) => a.nombre.localeCompare(b.nombre)))
    }, [carreras])

    return (
        <div className={styles.bloque}>
            <Titulo2>Carreras</Titulo2>
            <div className={styles.bloque}>
            {
                (carreras.length !== 0) ?
                carrerasOrdenadas.map(el => (
                    <details className={styles.details} key={el.codigo}>
                        <summary className={styles.summary}>{el.nombre}</summary>
                        <ul className={styles.ul}>
                            {
                                (el.cursos.length !== 0)
                                ? el.cursos.map(curso => (
                                    <li key={curso.codigo} className={styles.li}>
                                        {curso.nombre}
                                        <button className={styles.ver} onClick={() => navigator(`/cursos/${curso.codigo}`)}><i className="fa-solid fa-eye"></i></button>
                                    </li>
                                ))
                                : <p>No hay cursos</p>
                            }
                        </ul>
                    </details>
                ))
                : <p>No hay carreras</p>
            }
            </div>
        </div>
    )
}