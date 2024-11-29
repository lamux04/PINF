import styles from './ListaClases.module.css'

export const ListaClases = ({ clases }) => {

    return (
        <div className={styles.bloque}>
            {
                (clases.length !== 0)
                ?   clases.map((clase) => (
                        <details className={styles.details} key={clase.codigo}>
                        <summary className={styles.summary}>{clase.tipo} - {clase.duracion} minutos</summary>
                            <div className={styles.bloque_clase}>
                                <p><span className={styles.clave}>Tipo: </span><span>{clase.tipo}</span></p>
                                <p><span className={styles.clave}>Duración: </span><span>{clase.duracion} minutos</span></p>
                                <p><span className={styles.clave}>Importante: </span><span>{clase.importante}</span></p>
                                <p><span className={styles.clave}>Profesor: </span><span>{clase["profesor nombre"]} </span></p>
                                <p><span className={styles.clave}>Tipo de aula: </span><span>{clase["tipo aula"]} </span></p>
                            </div>
                        </details>
                    ))
                :   <p>No hay clases</p>
            }
        </div>
    )
}