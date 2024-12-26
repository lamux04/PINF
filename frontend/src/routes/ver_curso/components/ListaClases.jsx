import styles from './ListaClases.module.css'

export const ListaClases = ({ clases }) => {
    const clasesOrdenadas = [...clases].sort((a, b) => a.tipo.localeCompare(b.tipo))

    return (
        <div className={styles.bloque}>
            <p className={styles.p}><span className={styles.clave}>Importante:</span> <span>{clases.aprobable ? "SI" : "NO"}</span></p>
            {
                (clases.length !== 0)
                ?   clasesOrdenadas.map((clase) => (
                        <details className={styles.details} key={clase.codigo}>
                        <summary className={styles.summary}>{clase.tipo} - {clase.duracion} minutos</summary>
                            <div className={styles.bloque_clase}>
                                <p><span className={styles.clave}>Tipo: </span><span>{clase.tipo}</span></p>
                                <p><span className={styles.clave}>Duración: </span><span>{clase.duracion} minutos</span></p>
                                <p><span className={styles.clave}>Importante: </span><span>{clase.importante ? "SI" : "NO"}</span></p>
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