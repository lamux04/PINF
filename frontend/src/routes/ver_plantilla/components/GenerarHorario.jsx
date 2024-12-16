import { useState } from 'react'
import styles from './GenerarHorario.module.css'
import { Loading } from '../../components/Loading'
import { Validacion } from '../../components/Validacion'
import { host } from '../../../variables'

export const GenerarHorario = ({ codigo, horarios, agregarHorario }) => {
    const [nombre, setNombre] = useState('')
    const [cargando, setCargando] = useState(false)
    const [validacion, setValidacion] = useState('')
    const [h_ini, setH_ini] = useState('')
    const [h_fin, setH_fin] = useState('')
    const [inicio_desc, setInicio_desc] = useState('')
    const [fin_desc, setFin_Desc] = useState('')

    const getMinutes = (time) => {
    if (!time) return 0; // Si no hay valor, retorna 0
    const [hours, minutes] = time.split(":").map(Number); // Divide el string en horas y minutos
    return hours * 60 + minutes; // Convierte las horas a minutos y las suma
  };
    

    const handleClickGenerarHorario = async (ev) => {
        ev.preventDefault()

        if (horarios.find(el => el.nombre === nombre))
        {
            setValidacion('Ya existe un horario con ese nombre')
            setTimeout(() => setValidacion(''), 10000)
        } else if (nombre === '') {
            setValidacion('El nombre no puede estar vacío')
            setTimeout(() => setValidacion(''), 10000)
        } else if (nombre.length > 50) {
            setValidacion('El nombre no puede tener más de 50 caracteres')
            setTimeout(() => setValidacion(''), 10000)
        } else if (h_ini === '' || h_fin === '') {
            setValidacion('Las horas inicio y fin no pueden estar vacías')
            setTimeout(() => setValidacion(''), 10000)
        } else if (getMinutes(h_ini) >= getMinutes(h_fin)) {
            setValidacion('La hora de inicio no puede ser mayor o igual a la hora de fin')
            setTimeout(() => setValidacion(''), 10000)
        } else if (inicio_desc !== '' && fin_desc === '') {
            setValidacion('Si hay una hora de inicio de descanso, también debe haber una hora de fin de descanso')
            setTimeout(() => setValidacion(''), 10000)
        } else if (inicio_desc === '' && fin_desc !== '') {
            setValidacion('Si hay una hora de fin de descanso, también debe haber una hora de inicio de descanso')
            setTimeout(() => setValidacion(''), 10000)
        } else if (inicio_desc !== '' && getMinutes(inicio_desc) > getMinutes(fin_desc)) {
            setValidacion('La hora de inicio de descanso no puede ser mayor a la hora de fin de descanso')
            setTimeout(() => setValidacion(''), 10000)
        } else if (inicio_desc !== '' && getMinutes(h_ini) > getMinutes(inicio_desc)) {
            setValidacion('La hora de inicio de descanso no puede ser mayor a la hora de inicio')
            setTimeout(() => setValidacion(''), 10000)
        } else {
            if (inicio_desc === '') setInicio_desc('24:00')
            if (fin_desc === '') setFin_Desc('24:00')
            setValidacion('')
            setCargando(true)
            const data = await fetch(`${host}/api/horario/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ plantilla: codigo, nombre, h_ini: getMinutes(h_ini), h_fin: getMinutes(h_fin), inicio_desc: getMinutes(inicio_desc), fin_desc: getMinutes(fin_desc) })
            })

            const { horar_cod } = await data.json()
            agregarHorario({ nombre, codigo: horar_cod })
            setNombre('')
            setH_ini('')
            setH_fin('')
            setInicio_desc('')
            setFin_Desc('')
            setCargando(false)
        }

    }

    return (
        <>
            <form onSubmit={handleClickGenerarHorario} className={styles.generar}>
                <label className={styles.label}>
                    Nombre horario
                    <input id='nombre_horario' className={styles.input} type="text" value={nombre} onChange={ev => setNombre(ev.target.value)} />
                </label>
                <label className={styles.label}>
                    Hora inicio
                    <input className={styles.input} type="time" value={h_ini} onChange={ev => setH_ini(ev.target.value)} />
                </label>
                <label className={styles.label}>
                    Hora fin
                    <input className={styles.input} type="time" value={h_fin} onChange={ev => setH_fin(ev.target.value)} />
                </label>
                <label className={styles.label}>
                    Inicio descanso
                    <input className={styles.input} type="time" value={inicio_desc} onChange={ev => setInicio_desc(ev.target.value)} />
                </label>
                <label className={styles.label}>
                    Fin descanso
                    <input className={styles.input} type="time" value={fin_desc} onChange={ev => setFin_Desc(ev.target.value)} />
                </label>
                <button onClick={handleClickGenerarHorario} disabled={cargando} className={styles.button}>Generar horario</button>
                {(cargando) && <Loading />}
            </form>
            {
                (validacion !== '') &&
                    <Validacion>{validacion}</Validacion>
            }
        </>
    )
}