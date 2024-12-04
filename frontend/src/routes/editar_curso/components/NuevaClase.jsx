import { useState } from 'react'
import styles from './NuevaClase.module.css'
import { useProfesores } from '../hooks/useProfesores'
import { fetchCrearClase } from '../helpers/fetchCrearClase'
import { useTiposAulas } from '../hooks/useTiposAulas'

export const NuevaClase = ({ asignatura, curso, setCurso, setValidacion }) => {
    const [tipo, setTipo] = useState('')
    const [tipoAula, setTipoAula] = useState([])
    const [duracion, setDuracion] = useState('')
    const [profesorSeleccionado, setProfesorSeleccionado] = useState({})
    const { profesores } = useProfesores({ codigoCurso: curso.codigo })
    const { tiposAulas } = useTiposAulas({ codigoCurso: curso.codigo })
    const [importante, setImportante] = useState(false)
    
    const handleSave = async (ev) => {
        ev.preventDefault()

        if (tipo === '') {
            // Validación fallida
            setValidacion('El tipo de clase no puede estar vacío')
            setTimeout(() => setValidacion(''), 10000)
        } else if (tipoAula === ''.length === 0) {
            // Validación fallida
            setValidacion('El tipo de aula no puede estar vacío')
            setTimeout(() => setValidacion(''), 10000)
        } else if (duracion === '') {
            // Validación fallida
            setValidacion('La duración de la clase no puede estar vacío')
            setTimeout(() => setValidacion(''), 10000)
        } else if (!profesorSeleccionado.codigo) {
            // Validación fallida
            setValidacion('Debe seleccionar un profesor')
            setTimeout(() => setValidacion(''), 10000)
        } else {
            // Validación correcta
            const data = await fetchCrearClase({ asignatura: asignatura.codigo, descripcion: 'nombre', tipo, tipo_aula: tipoAula, duracion, profesor: profesorSeleccionado.codigo, importante })
            setValidacion('')
            setCurso({
                ...curso,
                asignaturas: curso.asignaturas.map(asignaturaMap => {
                    if (asignaturaMap.codigo === asignatura.codigo) {
                        return {
                            ...asignaturaMap,
                            clases: [
                                ...asignaturaMap.clases,
                                {
                                    codigo: data.codigo,
                                    descripcion: 'nombre',
                                    tipo,
                                    "tipo aula": tipoAula,
                                    duracion: parseInt(duracion),
                                    "profesor codigo": profesorSeleccionado.codigo,
                                    "profesor nombre": `${profesorSeleccionado.nombre} ${profesorSeleccionado.apellidos}`,
                                    importante: importante ? 1 : 0
                                }
                            ]
                        }
                    }
                    return asignaturaMap
                }
                )
            })
            setTipo('')
        }
    }
        
        

    return (
        <form className={styles.form} onSubmit={handleSave}>
            <input id={`inputId${asignatura.codigo}`} className={styles.checkbox} type="checkbox" placeholder='Nombre asignatura' checked={importante} onChange={() => setImportante(!importante)} />
            <label htmlFor={`inputId${asignatura.codigo}`} className={styles.label}>
                Importante
            </label>
            <input className={styles.input} type="text" placeholder='Tipo clase' value={tipo} onChange={ev => setTipo(ev.target.value)} />
            <input className={styles.input} type="text" placeholder='Duracion clase' value={duracion} onChange={ev => setDuracion(ev.target.value)} />
            <select className={styles.select} onChange={ev => setTipoAula(ev.target.value)}>
                <option value=''>Seleccione un tipo de aula</option>
                {
                    tiposAulas.map(tipo => (
                        <option key={tipo} value={tipo}>{tipo} </option>
                    ))
                }
            </select>
            <select className={styles.select} onChange={ev => setProfesorSeleccionado({ codigo: ev.target.value.split('/')[0], nombre: ev.target.value.split('/')[1], apellidos: ev.target.value.split('/')[2] })}>
                <option value=''>Seleccione un profesor</option>
                {
                    profesores.map(profesor => (
                        <option key={profesor.codigo} value={`${profesor.codigo}/${profesor.nombre}/${profesor.apellidos}`}>{profesor.nombre} {profesor.apellidos}</option>
                    ))
                }
            </select>
            <button onClick={handleSave} className={styles.button}><i className="fa-solid fa-plus"></i></button>
        </form>
    )
}