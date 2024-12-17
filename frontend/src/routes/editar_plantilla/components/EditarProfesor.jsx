import styles from './EditarProfesor.module.css'

import { fetchEliminarProfesor } from '../helpers/fetchEliminarProfesor'
import { NombreProfesorEditable } from './NombreProfesorEditable'

export const EditarProfesor = ({ profesor, plantilla, setPlantilla }) => {

    const handleEliminar = () => {
        fetchEliminarProfesor({ codigo: profesor.codigo })
        setPlantilla({
            ...plantilla,
            profesores: plantilla.profesores.filter(profe => profe.codigo !== profesor.codigo)
        })
    }

    return (
        <div className={styles.bloque}>
            <button disabled onClick={handleEliminar} className={styles.borrar}><i className="fa-solid fa-trash"></i></button>
            <NombreProfesorEditable profesor={profesor} plantilla={plantilla} setPlantilla={setPlantilla} />
        </div>
    )
}