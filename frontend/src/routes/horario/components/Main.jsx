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
import { useEffect } from 'react'

export const Main = ({ codigo }) => {
    const { horario, setHorario } = useHorario(codigo)  

    const navigator = useNavigate()

    const pasarDeMinutosAHoras = (minutos) => {
        // Formato HH:MM
        const hora = Math.floor(minutos / 60)
        const minuto = minutos % 60
        if (hora < 10 && minuto < 10) {
            return `0${hora}:0${minuto}`
        } else if (hora < 10) {
            return `0${hora}:${minuto}`
        } else if (minuto < 10) {
            return `${hora}:0${minuto}`
        } else {
            return `${hora}:${minuto}`
        }
    }

    const horarioConColores

    return (
        <div className={styles.bloque_principal}>
            <Atras onClick={() => navigator('/plantillas')} />
            {
                (horario) && 
                    <div className={styles.main}>
                        <Titulo>Horario - {horario.nombre}</Titulo>
                        <p><span className={styles.clave}>Código:</span> {horario.codigo}</p>
                        <p><span className={styles.clave}>Hora de apertura del centro:</span> {pasarDeMinutosAHoras(horario.h_ini)}</p>
                        <p><span className={styles.clave}>Hora de cierre del centro:</span> {pasarDeMinutosAHoras(horario.h_fin)}</p>
                        <FiltrarCarreras horario={horario} setHorario={setHorario} />
                        <FiltrarCursos horario={horario} setHorario={setHorario} />
                        <FiltrarAsignaturas horario={horario} setHorario={setHorario} />
                        <FiltrarClases horario={horario} setHorario={setHorario} />
                        <HorarioVisual horario={horario} h_ini={pasarDeMinutosAHoras(horario.h_ini)} h_fin={pasarDeMinutosAHoras(horario.h_fin)} />
                    </div>
            }
        </div>
    )
}