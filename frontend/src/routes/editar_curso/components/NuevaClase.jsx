import { useEffect, useState } from 'react'
import styles from './NuevaClase.module.css'
import { useProfesores } from '../hooks/useProfesores'
import { fetchCrearClase } from '../helpers/fetchCrearClase'
import { useTiposAulas } from '../hooks/useTiposAulas'
import Select from 'react-select'

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        borderColor: state.isFocused ? 'var(--orange)' : '#0000',
        borderRadius: '10px',
        boxShadow: state.isFocused ? '0 0 5px rgba(0,123,255,0.5)' : 'none',
        '&:hover': {
            borderColor: 'var(--orange)',
        },
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
        ? 'var(--orange)'
        : state.isFocused
        ? 'var(--light-orange)'
        : 'white',
        color: state.isSelected ? 'white' : 'black',
        padding: '10px',
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: '4px',
        marginTop: '0',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'black',
        fontWeight: 'bold',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#888',
    }),
};

export const NuevaClase = ({ asignatura, curso, setCurso, setValidacion }) => {
    const [tipo, setTipo] = useState('')
    const [tipoAula, setTipoAula] = useState('')
    const [duracion, setDuracion] = useState('')
    const [profesorSeleccionado, setProfesorSeleccionado] = useState({})
    const { profesores } = useProfesores({ codigoCurso: curso.codigo })
    const { tiposAulas } = useTiposAulas({ codigoCurso: curso.codigo })
    const [importante, setImportante] = useState(false)

    const [options, setOptions] = useState([])
    useEffect(() => {
        setOptions(profesores.map(profesor => ({ value: profesor.codigo, label: `${profesor.nombre} ${profesor.apellidos}` })))
    }, [profesores])

    const [optionsTiposAulas, setOptionsTiposAulas] = useState([])
    useEffect(() => {
        setOptionsTiposAulas(tiposAulas.map(tipo => ({ value: tipo, label: tipo })))
    }, [tiposAulas])

    
    const handleSave = async (ev) => {
        ev.preventDefault()

        if (tipo === '') {
            // Validación fallida
            setValidacion('El tipo de clase no puede estar vacío')
            setTimeout(() => setValidacion(''), 10000)
        } else if (tipoAula === '') {
            // Validación fallida
            setValidacion('El tipo de aula no puede estar vacío')
            setTimeout(() => setValidacion(''), 10000)
        } else if (duracion <= 0) {
            // Validación fallida
            setValidacion('La duración de la clase no puede ser negativo')
            setTimeout(() => setValidacion(''), 10000)
        } else if (!profesorSeleccionado.codigo) {
            // Validación fallida
            setValidacion('Debe seleccionar un profesor')
            setTimeout(() => setValidacion(''), 10000)
        } else if (tipo.length > 20) {
            // Validación fallida
            setValidacion('El tipo de clase no puede tener más de 20 caracteres')
            setTimeout(() => setValidacion(''), 10000)
        } else if (tipoAula.length > 40) {
            // Validación fallida
            setValidacion('El tipo de aula no puede tener más de 40 caracteres')
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
            <input className={styles.input} type="number" placeholder='Duracion clase' value={duracion} onChange={ev => setDuracion(ev.target.value)} />
            <Select
                options={optionsTiposAulas}
                onChange={selected => setTipoAula(selected.value)}
                placeholder='Seleccione un tipo de aula'
                isClearable
                isSearchable
                className={styles.select}
                styles={customStyles}
            />
            <Select
                options={options}
                onChange={selected => setProfesorSeleccionado({ codigo: selected.value, nombre: selected.label.split(' ')[0], apellidos: selected.label.split(' ').slice(1).join(' ') })}
                placeholder='Seleccione un profesor'
                isClearable
                isSearchable
                className={styles.select}
                styles={customStyles}
            />
            <button onClick={handleSave} className={styles.button}><i className="fa-solid fa-plus"></i></button>
        </form>
    )
}