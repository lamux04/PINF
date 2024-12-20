import styles from './FiltrarCarreras.module.css'

import { Titulo2 } from '../../components/Titulo2'
import { Checkbox } from '../../components/Checkbox'

export const FiltrarCarreras = ({ horario, setHorario }) => {

    const onChange = (e, codigo) => {
        setHorario({
            ...horario,
            carreras: horario.carreras.map(carrera => {
                if (carrera.codigo === codigo) {
                    return {
                        ...carrera,
                        visible: !carrera.visible
                    }
                }
                return carrera
            })
        })
    }

    return (
        <div className={styles.filtrar_carreras}>
            <Titulo2>Carreras</Titulo2>
            <div className={styles.bloque}>
            {
                horario.carreras.map(carrera => (
                    <Checkbox key={carrera.codigo} id={carrera.codigo} label={carrera.nombre} checked={carrera.visible} onChange={(ev) => onChange(ev, carrera.codigo)} />
                ))
            }
            </div>
        </div>
    )
}