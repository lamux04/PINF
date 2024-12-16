import { Titulo2 } from '../../components/Titulo2'
import styles from './VerAulas.module.css'

export const VerAulas = ({ aulas }) => {
    const aulasOrdenadas = [...aulas].sort((a, b) => a.nombre.localeCompare(b.nombre))

    return (
        <div className={styles.bloque}>
            <Titulo2>Aulas</Titulo2>
            <div className={styles.bloque}>
            {
                (aulas.length !== 0) 
                ?   <ul className={styles.ul}>
                        {
                            aulasOrdenadas.map(el => (
                                <li key={el.codigo}>{el.nombre} - {el.tipo}</li>
                            ))
                        }
                    </ul>
                : <p>No hay aulas</p>
            }
            </div>
        </div>
    )
}