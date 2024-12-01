import styles from './EditarTipoAula.module.css'

import { EditarAula } from './EditarAula'

export const EditarTipoAula = ({ tipoAula, aulas, plantilla, setPlantilla }) => {

    return (
        <details className={styles.details}>
            <summary className={styles.summary}>{tipoAula}</summary>
            <ul className={styles.ul}>
                {
                    aulas.map(aula => (
                        <li key={aula.codigo}>
                            <EditarAula aula={aula} plantilla={plantilla} setPlantilla={setPlantilla} />
                        </li>
                    ))
                }
            </ul>
        </details>
    )
}