import { Titulo2 } from '../../components/Titulo2'
import styles from './VerProfesores.module.css'

export const VerProfesores = ({ profesores }) => {
    return (
        <div className={styles.bloque}>
            <Titulo2>Profesores</Titulo2>
            <div className={styles.bloque}>
            {
                (profesores.length !== 0) 
                ?   <ul className={styles.ul}>
                        {
                            profesores.map(el => (
                                <li key={el.codigo}>{el.nombre} {el.apellidos}</li>
                            ))
                        }
                    </ul>
                : <p>No hay profesores</p>
            }
            </div>
        </div>
    )
}