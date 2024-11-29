import styles from './HorariosGenerados.module.css'

import { GenerarHorario } from './GenerarHorario'
import { useHorarios } from '../hooks/useHorarios'
import { ListaHorarios } from '../../home/components/ListaHorarios'
import { fetchEliminarHorario } from '../helpers/fetchEliminarHorario'
import { Titulo2 } from '../../components/Titulo2'

export const HorariosGenerados = ({ codigo }) => {
    const { horarios, hayHorarios, agregarHorario, quitarHorario } = useHorarios({ codigo })

    return (
        <div className={styles.bloque}>
            <Titulo2>Horarios generados</Titulo2>
            <ListaHorarios horarios={horarios} hayHorarios={hayHorarios} quitarHorario={quitarHorario} fetchEliminarHorario={fetchEliminarHorario}></ListaHorarios>
            <GenerarHorario horarios={horarios} codigo={codigo} agregarHorario={agregarHorario} />
        </div>
    )
}