import { useState } from 'react'
import styles from './NuevaAsignatura.module.css'
import { fetchCrearAsignatura } from '../helpers/fetchCrearAsignatura'

export const NuevaAsignatura = ({ curso, setCurso, setValidacion }) => {
    const [nombre, setNombre] = useState('')
    const [aprobabilidad, setAprobabilidad] = useState(true)

    const handleClick = async (ev) => {
        ev.preventDefault()

        if (nombre === '')
        {
            setValidacion('El nombre no puede estar vacío')
            setTimeout(() => setValidacion(''), 10000)
        } else if (nombre.length > 30) {
            setValidacion('El nombre no puede tener más de 30 caracteres')
            setTimeout(() => setValidacion(''), 10000)
        } else if (curso.asignaturas.find(el => el.nombre === nombre)) {
            // Validación fallida
            setValidacion('Ya existe una asignatura con ese nombre')
            setTimeout(() => setValidacion(''), 10000)
        } else {
            // Validación correcta
            const data = await fetchCrearAsignatura({ curso: curso.codigo, nombre, aprobabilidad: aprobabilidad ? 1 : 0 })
            setValidacion('')
            setCurso({
                ...curso, 
                asignaturas: [...curso.asignaturas, { codigo: data.codigo, nombre, aprobabilidad, clases: [] }]
            })
            setNombre('')
        }
    }

    return (
        <form onSubmit={handleClick}>
            <input id='checkboxId' className={styles.checkbox} type="checkbox" placeholder='Nombre asignatura' checked={aprobabilidad} onChange={() => setAprobabilidad(!aprobabilidad)} />
            <label htmlFor='checkboxId' className={styles.label}>
                {aprobabilidad ? 'Aprobable' : 'No aprobable'}
            </label>
            
            <input className={styles.input} type="text" placeholder='Nombre asignatura' value={nombre} onChange={ev => setNombre(ev.target.value)} />
            <button className={styles.button} onClick={handleClick}><i className="fa-solid fa-plus"></i></button>
        </form>
    )
}