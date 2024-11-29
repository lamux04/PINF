import { useState } from 'react'
import { Input } from '../../components/Input'
import styles from './GenerarHorario.module.css'
import { Loading } from '../../components/Loading'
import { Validacion } from '../../components/Validacion'

export const GenerarHorario = ({ codigo, horarios, agregarHorario }) => {
    const [nombre, setNombre] = useState('')
    const [cargando, setCargando] = useState(false)
    const [validacion, setValidacion] = useState('')
    

    const handleClickGenerarHorario = (ev) => {
        ev.preventDefault()

        if (horarios.find(el => el.nombre === nombre))
        {
            setValidacion('Ya existe un horario con ese nombre')
            return
        }

        setValidacion('')

        // LLamar a agregarHorario
    }

    return (
        <>
            <form onSubmit={handleClickGenerarHorario} className={styles.generar}>
                <Input disabled={cargando} placeholder='Nombre horario' type='text' value={nombre} setValue={setNombre}></Input>
                <button disabled={cargando} className={styles.button}>Generar horario</button>
                {(cargando) && <Loading />}
            </form>
            {
                (validacion !== '') &&
                    <Validacion>{validacion}</Validacion>
            }
        </>
    )
}