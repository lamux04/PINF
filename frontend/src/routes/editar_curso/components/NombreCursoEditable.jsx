import styles from './NombreCursoEditable.module.css'

import { useState } from 'react'
import { Editable } from '../../components/Editable'
import { MiniValidacion } from '../../components/MiniValidacion'
import { useCursos } from '../hooks/useCursos'
import { fetchModificarNombreCurso } from '../helpers/fetchModificarNombreCurso'

export const NombreCursoEditable = ({ curso, setCurso }) => {
    const [nombre, setNombre] = useState(curso.nombre)
    const [editable, setEditable] = useState(false)
    const [validacion, setValidacion] = useState('')
    const { cursos, cambiarNombre } = useCursos({ codigoCurso: curso.codigo })

    const handleSaveNombre = (ev) => {
        ev.preventDefault()

        if (nombre === '')
        {
            setValidacion('El nombre no puede estar vacío')
            setTimeout(() => setValidacion(''), 10000)
        } else if (cursos.find(el => el.codigo !== curso.codigo && el.nombre === nombre)) {
            // Validación fallida
            setValidacion('Ya existe un curso con ese nombre')
            setTimeout(() => setValidacion(''), 10000)
        } else {
            // Validación correcta
            fetchModificarNombreCurso({ codigo: curso.codigo, nombre })
            cambiarNombre({ codigo: curso.codigo, nombre })
            setValidacion('')
            setEditable(false)
            setCurso({ ...curso, nombre })
        }
    }

    return (
        <span className={styles.caracteristica}>
            <span className={styles.clave}>Nombre: </span>
            <Editable value={nombre} setValue={setNombre} editable={editable} setEditable={setEditable} onClick={handleSaveNombre} />
            <MiniValidacion>{validacion}</MiniValidacion>
        </span>
    )
}