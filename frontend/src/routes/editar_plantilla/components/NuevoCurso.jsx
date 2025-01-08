import { useState } from 'react'
import styles from './NuevoCurso.module.css'
import { fetchCrearCurso } from '../helpers/fetchCrearCurso'

export const NuevoCurso = ({ plantilla, setPlantilla, setValidacion, codigoCarrera }) => {
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
        } else if (plantilla.carreras.find(carrera => (carrera.codigo === codigoCarrera) ? carrera.cursos.find(curso => curso.nombre === nombre) : false)) {
            // Validación fallida
            setValidacion('Ya existe una curso con ese nombre')
            setTimeout(() => setValidacion(''), 10000)
        } else if (!/^\d/.test(nombre)) {
            setValidacion('El nombre del curso debe empezar por un dígito')
            setTimeout(() => setValidacion(''), 10000)
        } else {
            // Validación correcta
            const data = await fetchCrearCurso({ nombre, carrera: codigoCarrera })
            setValidacion('')
            setNombre('')
            setPlantilla(plantilla => ({
                ...plantilla,
                carreras: plantilla.carreras.map(carrera => 
                    carrera.codigo === codigoCarrera
                        ? {
                            ...carrera,
                            cursos: [...carrera.cursos, { codigo: data.codigo, nombre }]
                        }
                        : carrera
                )
            }))
        }
    }

    return (
        <form onSubmit={handleClick}>
            <input className={styles.input} type="text" placeholder='Nombre curso' value={nombre} onChange={ev => setNombre(ev.target.value)} />
            <button className={styles.button} onClick={handleClick}><i className="fa-solid fa-plus"></i></button>
        </form>
    )
}