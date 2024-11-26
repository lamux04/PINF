import styles from './NuevaPlantilla.module.css'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Validacion } from '../../components/Validacion'
import { useState } from 'react'
import { fetchCrearPlantilla } from '../helpers/fetchCrearPlantilla'

export const NuevaPlantilla = ({ plantillas, crearPlantilla }) => {
    const [nombre, setNombre] = useState('')
    const [validacion, setValidacion] = useState('')

    const handleClick = async (ev) => {
        ev.preventDefault()
        if (nombre === '')
        {
            setValidacion('El nombre no puede estar vacío')
            return
        }
        if (plantillas.find(el => el.nombre === nombre))
        {
            setValidacion('El nombre no puede repetirse entre plantillas')
            return
        }

        const response = await fetchCrearPlantilla({ nombre })
        if (!response.error)
        {
            crearPlantilla({ codigo: response.data.codigo, nombre: response.data.nombre })
            setValidacion('')
            setNombre('')
        }   
        else 
        {
            if (response.data.message === 'Error de validación')
                setValidacion('El codigo del horario debe tener 36 carácteres')
            else if (response.data.message === 'Horario no encontrado')
                setValidacion('El horario no existe')
            else 
                setValidacion('El horario ya ha sido añadido')
        }
    }

    return (
        <>
            <form onSubmit={handleClick} className={styles.bloque}>
                <Input type="text" placeholder="Nombre de la plantilla" value={nombre} setValue={setNombre}></Input>
                <Button text="Crear" onClick={handleClick}></Button>
            </form>
            {
                (validacion !== '')
                    && <Validacion>{validacion}</Validacion>
            }
        </>
    )
}