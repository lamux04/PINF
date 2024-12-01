import { fetchCrearProfesor } from '../helpers/fetchCrearProfesor'
import styles from './NuevoProfesor.module.css'

import { useState } from 'react'

export const NuevoProfesor = ({ plantilla, setPlantilla, setValidacion }) => {
    const [nombre, setNombre] = useState('')

    const handleClick = async (ev) => {
        ev.preventDefault()

        if (nombre === '')
        {
            setValidacion('El nombre no puede estar vacío')
            setTimeout(() => setValidacion(''), 10000)
        }
        else if (plantilla.profesores.find(profe => `${profe.nombre} ${profe.apellidos}` === nombre)) {
            // Validación fallida
            setValidacion('Ya existe un profesor con ese nombre')
            setTimeout(() => setValidacion(''), 10000)
        } else {
            // Validación correcta
            const data = await fetchCrearProfesor({ plantilla: plantilla.codigo, nombre: nombre.split(' ')[0], apellido1: nombre.split(' ')[1] || '', apellido2: nombre.split(' ').slice(2).join(' ') || '' })
            setValidacion('')
            setNombre('')
            setPlantilla(plantilla => ({
                ...plantilla,
                profesores: [...plantilla.profesores, { codigo: data.codigo, nombre: data.nombre, apellidos: data.apellidos }]
            }))
        }
    }

    return (
        <form onSubmit={handleClick}>
            <input className={styles.input} type="text" placeholder='Nombre profesor' value={nombre} onChange={ev => setNombre(ev.target.value)} />
            <button className={styles.button} onClick={handleClick}><i className="fa-solid fa-plus"></i></button>
        </form>
    )
}