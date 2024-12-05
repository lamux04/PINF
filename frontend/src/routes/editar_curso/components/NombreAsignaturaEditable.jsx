import styles from './NombreAsignaturaEditable.module.css'

import { useState } from 'react'
import { fetchModificarNombreAsignatura } from '../helpers/fetchModificarNombreAsignatura'
import { Editable } from '../../components/Editable'
import { MiniValidacion } from '../../components/MiniValidacion'

export const NombreAsignaturaEditable = ({ asignatura, curso, setCurso}) => {
    const [nombre, setNombre] = useState(asignatura.nombre)
    const [editable, setEditable] = useState(false)
    const [validacion, setValidacion] = useState('')

    const handleSaveNombre = (ev) => {
        ev.preventDefault()

        if (nombre === '')
        {
            setValidacion('El nombre no puede estar vacío')
            setTimeout(() => setValidacion(''), 10000)
        } else if (nombre.length > 30) {
            setValidacion('El nombre no puede tener más de 30 caracteres')
            setTimeout(() => setValidacion(''), 10000)
        } else if (curso.asignaturas.find(el => el.codigo !== asignatura.codigo && el.nombre === nombre)) {
            // Validación fallida
            setValidacion('Ya existe un curso con ese nombre')
            setTimeout(() => setValidacion(''), 10000)
        } else {
            // Validación correcta
            fetchModificarNombreAsignatura({ codigo: asignatura.codigo, nombre })
            setValidacion('')
            setEditable(false)
            setCurso({
                ...curso,
                asignaturas: curso.asignaturas.map(el => {
                    if (el.codigo === asignatura.codigo) {
                        return {
                            ...el,
                            nombre
                        }
                    } else
                        return el
                
            })})
        }
    }

    return (
        <span>
            <Editable value={nombre} setValue={setNombre} editable={editable} setEditable={setEditable} onClick={handleSaveNombre} />
            <MiniValidacion>{validacion}</MiniValidacion>
        </span>
    )
}