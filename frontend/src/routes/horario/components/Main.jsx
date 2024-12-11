import styles from './Main.module.css'

import { useHorario } from '../hooks/useHorario'
import { Atras } from '../../components/Atras'
import { useNavigate } from 'react-router-dom'
import { Titulo } from '../../components/Titulo'
import { HorarioVisual } from './HorarioVisual'
import { FiltrarCarreras } from './FiltrarCarreras'
import { FiltrarCursos } from './FiltrarCursos'
import { FiltrarAsignaturas } from './FiltrarAsignaturas'
import { FiltrarClases } from './FiltrarClases'

export const Main = ({ codigo }) => {
    const { horario, setHorario } = useHorario(codigo)  

    const navigator = useNavigate()

    return (
        <div className={styles.bloque_principal}>
            <Atras onClick={() => navigator('/plantillas')} />
            {
                (horario) && 
                    <div className={styles.main}>
                        <Titulo>Horario - {horario.nombre}</Titulo>
                        <FiltrarCarreras horario={horario} setHorario={setHorario} />
                        <FiltrarCursos horario={horario} setHorario={setHorario} />
                        <FiltrarAsignaturas horario={horario} setHorario={setHorario} />
                        <FiltrarClases horario={horario} setHorario={setHorario} />
                        <HorarioVisual horario={horario} />
                    </div>
            }
        </div>
    )
}