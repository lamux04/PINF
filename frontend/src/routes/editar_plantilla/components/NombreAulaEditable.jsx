import styles from './NombreAulaEditable.module.css'

import { Editable } from '../../components/Editable'
import { useState } from 'react'
import { MiniValidacion } from '../../components/MiniValidacion'
import { fetchModificarNombreAula } from '../helpers/fetchModificarNombreAula'

export const NombreAulaEditable = ({ aula, plantilla, setPlantilla }) => {
    const [nombre, setNombre] = useState(aula.nombre)
    const [editable, setEditable] = useState(false)
    const [validacion, setValidacion] = useState('')

    const handleClick = (ev) => {
        ev.preventDefault()

        if (nombre === '')
        {
            setValidacion('El nombre no puede estar vacío')
            setTimeout(() => setValidacion(''), 10000)
        } else if (plantilla.aulas.find(el => el.codigo != aula.codigo && el.nombre === nombre)) {
            // Validación fallida
            setValidacion('Ya existe un profesor con ese nombre')
            setTimeout(() => setValidacion(''), 10000)
        } else {
            // Validación correcta
            fetchModificarNombreAula({ codigo: aula.codigo, nombre })
            setValidacion('')
            setEditable(false)
            setPlantilla(() => ({
                ...plantilla,
                aulas: plantilla.aulas.map(el => el.codigo === aula.codigo ? { ...aula, nombre } : el)
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