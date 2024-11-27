import { useState } from 'react'
import { Input } from '../../components/Input'
import styles from './GenerarHorario.module.css'
import { Loading } from '../../components/Loading'

export const GenerarHorario = ({ codigo, agregarHorario }) => {
    const [nombre, setNombre] = useState('')
    const [cargando, setCargando] = useState(false)
    

    const handleClickGenerarHorario = (ev) => {
        ev.preventDefault()

        // LLamar a agregarHorario
    }

    return (
        <form onSubmit={handleClickGenerarHorario} className={styles.generar}>
            <Input disabled={cargando} placeholder='Nombre horario' type='text' value={nombre} setValue={setNombre}></Input>
            <button disabled={cargando} className={styles.button}>Generar horario</button>
            {(cargando) && <Loading />}
        </form>
    )
}