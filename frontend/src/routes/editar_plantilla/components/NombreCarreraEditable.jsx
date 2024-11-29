import styles from './NombreCarreraEditable.module.css'

import { useState } from 'react'
import { Editable } from '../../components/Editable'
import { MiniValidacion } from '../../components/MiniValidacion'
import { fetchModificarNombreCarrera } from '../helpers/fetchModificarNombreCarrera'

export const NombreCarreraEditable = ({ plantilla, setPlantilla, codigoCarrera }) => {
    const [editable, setEditable] = useState(false)
    const [nombre, setNombre] = useState(() => {
        const index = plantilla.carreras.findIndex(el => el.codigo === codigoCarrera)
        return plantilla.carreras[index].nombre
    })
    const [validacion, setValidacion] = useState('')

    const handleClick = (ev) => {
        ev.preventDefault()

        if (plantilla.carreras.find(el => el.codigo !== codigoCarrera && el.nombre === nombre)) {
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
            <MiniValidacion>{validacion}</MiniValidacion>
        </span>
    )
}