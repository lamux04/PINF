import { fetchCrearCarrera } from '../helpers/fetchCrearCarrera'
import styles from './NuevaCarrera.module.css'

import { useState } from 'react'

export const NuevaCarrera = ({ plantilla, setPlantilla, setValidacion }) => {
    const [nombre, setNombre] = useState('')

    const handleClick = async (ev) => {
        ev.preventDefault()

        if (nombre === '')
        {
            setValidacion('El nombre no puede estar vacío')
            setTimeout(() => setValidacion(''), 10000)
        } else if (nombre.length > 30) {
            setValidacion('El nombre no puede tener más de 30 caracteres')
            setTimeout(() => setValidacion(''), 10000)
        } else if (plantilla.carreras.find(carrera => carrera.nombre === nombre)) {
            // Validación fallida
            setValidacion('Ya existe una plantilla con ese nombre')
            setTimeout(() => setValidacion(''), 10000)
        } else {
            // Validación correcta
            const data = await fetchCrearCarrera({ nombre, plantilla: plantilla.codigo })
            setValidacion('')
            setNombre('')
            setPlantilla(plantilla => ({
                ...plantilla,
                carreras: [
                    ...plantilla.carreras,
                    { codigo: data.codigo, nombre, cursos: [] }
                ]
            }))
        }
    }

    return (
        <form onSubmit={handleClick}>
            <input className={styles.input} type="text" placeholder='Nombre carrera' value={nombre} onChange={ev => setNombre(ev.target.value)} />
            <button className={styles.button} onClick={handleClick}><i className="fa-solid fa-plus"></i></button>
        </form>
    )
}