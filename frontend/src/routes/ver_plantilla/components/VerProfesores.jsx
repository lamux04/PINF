import { Titulo2 } from '../../components/Titulo2'
import styles from './VerProfesores.module.css'

export const VerProfesores = ({ profesores }) => {
    const profesoresOrdenados = [...profesores].sort((a, b) => a.nombre.localeCompare(b.nombre))

    return (
        <div className={styles.bloque}>
            <Titulo2>Profesores</Titulo2>
            <div className={styles.bloque}>
            {
                (profesoresOrdenados.length !== 0) 
                ?   <ul className={styles.ul}>
                        {
                            profesoresOrdenados.map(el => (
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