import styles from './NuevaAula.module.css'

import { useRef, useState } from 'react'
import { fetchCrearAula } from '../helpers/fetchCrearAula'

export const NuevaAula = ({ plantilla, setPlantilla, setValidacion }) => {
    const [nombre, setNombre] = useState('')
    const [tipo, setTipo] = useState('')

    const inputNombre = useRef()

    const handleClick = async (ev) => {
        ev.preventDefault()

        if (nombre === '')
        {
            setValidacion('El nombre no puede estar vacío')
            setTimeout(() => setValidacion(''), 10000)
        } else if (tipo === '')
        {
            setValidacion('El tipo de aula no puede estar vacío')
            setTimeout(() => setValidacion(''), 10000)
        } else if (plantilla.aulas.find(aula => aula.nombre === nombre)) {
            // Validación fallida
            setValidacion('Ya existe un aula con ese nombre')
            setTimeout(() => setValidacion(''), 10000)
        } else {
            // Validación correcta
            const data = await fetchCrearAula({ plantilla: plantilla.codigo, nombre, tipo })
            setValidacion('')
            setNombre('')
            inputNombre.current.focus()
            setPlantilla(plantilla => ({
                ...plantilla,
                aulas: [...plantilla.aulas, data]
            }))
        }
    }

    return (
        <form onSubmit={handleClick}>
            <input ref={inputNombre} className={styles.input} type="text" placeholder='Nombre aula' value={nombre} onChange={ev => setNombre(ev.target.value)} />
            <input className={styles.input} type="text" placeholder='Tipo aula' value={tipo} onChange={ev => setTipo(ev.target.value)} />
            <button className={styles.button} onClick={handleClick}><i className="fa-solid fa-plus"></i></button>
        </form>
    )
}