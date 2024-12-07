import { Checkbox } from '../../components/Checkbox'
import { Titulo3 } from '../../components/Titulo3'
import styles from './FiltrarAsignaturas.module.css'

export const FiltrarAsignaturas = ({ horario, setHorario }) => {
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
                                if (asignatura.codigo === codigo) {
                                    return {
                                        ...asignatura,
                                        visible: !asignatura.visible
                                    }
                                }
                                return asignatura
                            })
                        }
                    })
                }
            })
        })
    }

    return (
        <div className={styles.filtrar_asignaturas}>
            <Titulo3>Asignaturas</Titulo3>
            <div className={styles.bloque}>
            {
                horario.carreras.map(carrera => {
                    if (carrera.visible)
                        return (carrera.cursos.map(curso => {
                            if (curso.visible)
                            {
                                return (
                                    <details className={styles.details} key={curso.codigo}>
                                        <summary className={styles.summary}>{`${carrera.nombre} - ${curso.nombre}`}</summary>
                                        <div className={styles.bloque_asignaturas}>
                                            {
                                                curso.asignaturas.map(asignatura => (
                                                    <Checkbox key={asignatura.codigo} id={asignatura.codigo} label={asignatura.nombre} checked={asignatura.visible} onChange={(ev) => onChange(ev, asignatura.codigo)} />
                                                ))
                                            }
                                        </div>
                                    </details>
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