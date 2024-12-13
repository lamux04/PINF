import { useState } from 'react'
import { Input } from '../../components/Input'
import styles from './GenerarHorario.module.css'
import { Loading } from '../../components/Loading'
import { Validacion } from '../../components/Validacion'
import { host } from '../../../variables'

export const GenerarHorario = ({ codigo, horarios, agregarHorario }) => {
    const [nombre, setNombre] = useState('')
    const [cargando, setCargando] = useState(false)
    const [validacion, setValidacion] = useState('')
    

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
        } else {
            setValidacion('')
            setCargando(true)
            const data = await fetch(`${host}/api/horario/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ plantilla: codigo, nombre })
            })

            const { horar_cod } = await data.json()
            agregarHorario({ nombre, codigo: horar_cod })
            setNombre('')
            setCargando(false)
        }

    }

    return (
        <>
            <form onSubmit={handleClickGenerarHorario} className={styles.generar}>
                <Input disabled={cargando} placeholder='Nombre horario' type='text' value={nombre} setValue={setNombre}></Input>
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