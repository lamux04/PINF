import { Checkbox } from '../../components/Checkbox'
import { Titulo2 } from '../../components/Titulo2'
import { Titulo3 } from '../../components/Titulo3'
import styles from './FiltrarCursos.module.css'

export const FiltrarCursos = ({ horario, setHorario }) => {
    const onChange = (e, codigo) => {
        setHorario({
            ...horario,
            carreras: horario.carreras.map(carrera => {
                return {
                    ...carrera,
                    cursos: carrera.cursos.map(curso => {
                        if (curso.codigo === codigo) {
                            return {
                                ...curso,
                                visible: !curso.visible
                            }
                        }
                        return curso
                    })
                }
            })
        })
    }

    return (
        <div className={styles.filtrar_cursos}>
            <Titulo2>Cursos</Titulo2>
            <div className={styles.bloque}>
            {
                horario.carreras.map(carrera => {
                    if (carrera.visible)
                        return (carrera.cursos.map(curso => (
                                <Checkbox key={curso.codigo} id={curso.codigo} label={`${carrera.nombre} - ${curso.nombre}`} checked={curso.visible} onChange={(ev) => onChange(ev, curso.codigo)} />
                            )))
                })
            }
            </div>
        </div>
    )
}