import { Checkbox } from '../../components/Checkbox'
import { Titulo3 } from '../../components/Titulo3'
import styles from './FiltrarClases.module.css'

export const FiltrarClases = ({ horario, setHorario }) => {
    const onChange = (e, codigo) => {
        setHorario({
            ...horario,
            carreras: horario.carreras.map(carrera => {
                return {
                    ...carrera,
                    cursos: carrera.cursos.map(curso => {
                        return {
                            ...curso,
                            asignaturas: curso.asignaturas.map(asignatura => {
                                return {
                                    ...asignatura,
                                    clases: asignatura.clases.map(clase => {
                                        if (clase.codigo === codigo) {
                                            return {
                                                ...clase,
                                                visible: !clase.visible
                                            }
                                        }
                                        return clase
                                    })
                                }
                            })
                        }
                    })
                }
            })
        })
    }

    return (
        <div className={styles.filtrar_clases}>
            <Titulo3>Clases</Titulo3>
            <div className={styles.bloque}>
            {
                horario.carreras.map(carrera => {
                    if (carrera.visible)
                        return (carrera.cursos.map(curso => {
                            if (curso.visible)
                            {
                                return (
                                    curso.asignaturas.map(asignatura => {
                                        if (asignatura.visible) return (
                                            <details className={styles.details} key={asignatura.codigo}>
                                                <summary className={styles.summary}>{`${carrera.nombre} - ${curso.nombre} - ${asignatura.nombre}`}</summary>
                                                <div className={styles.bloque_clases}>
                                                    {
                                                        asignatura.clases.map(clase => (
                                                            <Checkbox key={clase.codigo} id={clase.codigo} label={`${asignatura.nombre} - ${clase.tipo}`} checked={clase.visible} onChange={(ev) => onChange(ev, clase.codigo)} />
                                                        ))
                                                    }
                                                </div>
                                            </details>
                                        )
                                    })
                                )
                            }
                        })
                    )
                })
            }
            </div>
        </div>
    )
}