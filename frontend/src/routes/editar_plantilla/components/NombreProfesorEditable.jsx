import styles from './NombreProfesorEditable.module.css'

import { Editable } from '../../components/Editable'
import { useState } from 'react'
import { MiniValidacion } from '../../components/MiniValidacion'
import { fetchModificarNombreProfesor } from '../helpers/fetchModificarNombreProfesor'

export const NombreProfesorEditable = ({ profesor, plantilla, setPlantilla }) => {
    const [nombre, setNombre] = useState(`${profesor.nombre} ${profesor.apellidos}`)
    const [editable, setEditable] = useState(false)
    const [validacion, setValidacion] = useState('')

    const handleClick = (ev) => {
        ev.preventDefault()

        if (nombre === '')
        {
            setValidacion('El nombre no puede estar vacío')
            setTimeout(() => setValidacion(''), 10000)
        } else if (plantilla.profesores.find(profe => profe.codigo != profesor.codigo && `${profe.nombre} ${profe.apellidos}` === nombre)) {
            // Validación fallida
            setValidacion('Ya existe un profesor con ese nombre')
            setTimeout(() => setValidacion(''), 10000)
        } else {
            // Validación correcta
            fetchModificarNombreProfesor({ codigo: profesor.codigo, nombre: nombre.split(' ')[0], apellido1: nombre.split(' ')[1] || '', apellido2: nombre.split(' ').slice(2).join(' ') || '' })
            setValidacion('')
            setEditable(false)
            setPlantilla(() => ({
                ...plantilla,
                profesores: plantilla.profesores.map(profe => profe.codigo === profesor.codigo ? { ...profe, nombre: nombre.split(' ')[0], apellidos: nombre.split(' ').slice(1).join(' ') || '' } : profe)
            }))
        }
    }

    return (
        <>
            <Editable value={nombre} setValue={setNombre} editable={editable} setEditable={setEditable} onClick={handleClick} />
            <MiniValidacion>{validacion}</MiniValidacion>
        </>
        
    )
}