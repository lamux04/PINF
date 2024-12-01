import styles from './NombreCursoEditable.module.css'

import { useState } from 'react'
import { Editable } from '../../components/Editable'
import { MiniValidacion } from '../../components/MiniValidacion'
import { fetchModificarNombreCurso } from '../helpers/fetchModificarNombreCurso'

export const NombreCursoEditable = ({ curso, plantilla, setPlantilla, codigoCarrera }) => {
    const [nombre, setNombre] = useState(curso.nombre)
    const [editable, setEditable] = useState(false)
    const [validacion, setValidacion] = useState('')
    
    const handleClick = (ev) => {
        ev.preventDefault()

        if (nombre === '')
        {
            setValidacion('El nombre no puede estar vacío')
            setTimeout(() => setValidacion(''), 10000)
        }
        else if (plantilla.carreras.find(carrera => (carrera.codigo === codigoCarrera) ? carrera.cursos.find(el => el.nombre === nombre && el.codigo !== curso.codigo) : false)) {
            // Validación fallida
            setValidacion('Existe una carrera con el mismo nombre')
            setTimeout(() => setValidacion(''), 10000)
        } else {
            // Validación correcta, guardamos los datos en la base de datos
            fetchModificarNombreCurso({ codigo: curso.codigo, nombre })
            setValidacion('')
            setEditable(false)
            setPlantilla(() => {
                for (let carrera of plantilla.carreras)
                {
                    if (carrera.codigo === codigoCarrera)
                        for (let el of carrera.cursos)
                            if (el.codigo === curso.codigo)
                                curso.nombre = nombre
                }
                return plantilla
            })
        }
        
    }

    return (
        <span className={styles.editar}>
            <Editable value={nombre} setValue={setNombre} editable={editable} setEditable={setEditable} onClick={handleClick} />
            <MiniValidacion>{validacion}</MiniValidacion>
        </span>
    )
}