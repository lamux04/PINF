import { useState } from 'react'
import { Editable } from '../../components/Editable'
import styles from './NombreEditable.module.css'
import { usePlantillas } from '../../hooks/usePlantillas'
import { MiniValidacion } from '../../components/MiniValidacion'
import { fetchModificarNombre } from '../helpers/fetchModificarNombre'

export const NombreEditable = ({ plantilla, setPlantilla }) => {
    const [nombre, setNombre] = useState(plantilla.nombre)
    const [editable, setEditable] = useState(false)
    const [validacion, setValidacion] = useState('')
    const { plantillas, cambiarNombre } = usePlantillas()

    const handleClick = (ev) => {
        ev.preventDefault()

        if (plantillas.find(el => el.codigo !== plantilla.codigo && el.nombre === nombre)) {
            // Validación fallida
            setValidacion('Existe una plantilla con el mismo nombre')
            setTimeout(() => setValidacion(''), 10000)
        } else {
            // Validación correcta, guardamos los datos en la base de datos
            fetchModificarNombre({ codigo: plantilla.codigo, nombre })
            cambiarNombre({ codigo: plantilla.codigo, nombre })
            setValidacion('')
            setEditable(false)
            setPlantilla({
                ...plantilla,
                nombre
            })
        }
        
    }

    return (
        <span className={styles.bloque}>
            <span className={styles.clave}>Nombre: </span>
            <Editable value={nombre} setValue={setNombre} onClick={handleClick} editable={editable} setEditable={setEditable} />
            <MiniValidacion>{validacion}</MiniValidacion>
        </span>
    )
}