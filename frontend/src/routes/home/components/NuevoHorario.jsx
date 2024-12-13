import styles from './NuevoHorario.module.css'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Validacion } from '../../components/Validacion'
import { useState } from 'react'
import { fetchAgregarHorario } from './helpers/fetchAgregarHorario'

export const NuevoHorario = ({ agregarHorario }) => {
    const [codigo, setCodigo] = useState('')
    const [validacion, setValidacion] = useState('')

    const handleClick = async (ev) => {
        ev.preventDefault()
        const response = await fetchAgregarHorario({ codigo })
        if (!response.error)
        {
            agregarHorario(response.data)
            setValidacion('')
            setCodigo('')
        }   
        else 
        {
            if (response.data.message === 'Error de validación')
            {
                setValidacion('El codigo del horario debe tener 36 carácteres')
                setTimeout(() => setValidacion(''), 10000)
            } else if (response.data.message === 'Horario no encontrado')
            {
                setValidacion('El horario no existe')
                setTimeout(() => setValidacion(''), 10000)
            }
            else 
            {
                setValidacion('El horario ya ha sido añadido')
                setTimeout(() => setValidacion(''), 10000)
            }
        }
    }

    return (
        <>
            <form onSubmit={handleClick} className={styles.bloque}>
                <Input type="text" placeholder="Código del horario" value={codigo} setValue={setCodigo}></Input>
                <Button text="Añadir" onClick={handleClick}></Button>
            </form>
            {
                (validacion !== '')
                    && <Validacion>{validacion}</Validacion>
            }
            
        </>
    )
}