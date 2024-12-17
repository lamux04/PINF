import styles from './NombreCarreraEditable.module.css'

import { useState } from 'react'
import { Editable } from '../../components/Editable'
import { MiniValidacion } from '../../components/MiniValidacion'
import { fetchModificarNombreCarrera } from '../helpers/fetchModificarNombreCarrera'
import { fetchEliminarCarrera } from '../helpers/fetchEliminarCarrera'

export const NombreCarreraEditable = ({ plantilla, setPlantilla, codigoCarrera }) => {
    const [editable, setEditable] = useState(false)
    const [nombre, setNombre] = useState(() => {
        const index = plantilla.carreras.findIndex(el => el.codigo === codigoCarrera)
        return plantilla.carreras[index].nombre
    })
    const [validacion, setValidacion] = useState('')

    const handleEliminar = async () => {
        await fetchEliminarCarrera({ codigo: codigoCarrera })
        setPlantilla(plantilla => ({
            ...plantilla,
            carreras: plantilla.carreras.filter(el => el.codigo !== codigoCarrera)
        }))
    }

    const handleClick = (ev) => {
        ev.preventDefault()

        if (nombre === '')
        {
            setValidacion('El nombre no puede estar vacío')
            setTimeout(() => setValidacion(''), 10000)
        } else if (nombre.length > 30) {
            setValidacion('El nombre no puede tener más de 30 caracteres')
            setTimeout(() => setValidacion(''), 10000)
        } else if (plantilla.carreras.find(el => el.codigo !== codigoCarrera && el.nombre === nombre)) {
            // Validación fallida
            setValidacion('Existe una carrera con el mismo nombre')
            setTimeout(() => setValidacion(''), 10000)
        } else {
            // Validación correcta, guardamos los datos en la base de datos
            fetchModificarNombreCarrera({ codigo: codigoCarrera, nombre })
            setValidacion('')
            setEditable(false)
            setPlantilla(() => {
                for (let carrera of plantilla.carreras)
                {
                    if (carrera.codigo === codigoCarrera)
                        carrera.nombre = nombre
                }
                return plantilla
            })
        }
        
    }

    return (
        <span className={styles.bloque}>
            <Editable editable={editable} setEditable={setEditable} value={nombre} setValue={setNombre} onClick={handleClick} />
            <button disabled onClick={handleEliminar} className={styles.boton}><i className="fa-solid fa-trash"></i></button>
            <MiniValidacion>{validacion}</MiniValidacion>

        </span>
    )
}