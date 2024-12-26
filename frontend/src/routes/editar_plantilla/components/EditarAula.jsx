import { fetchEliminarAula } from '../helpers/fetchEliminarAula'
import styles from './EditarAula.module.css'

import { NombreAulaEditable } from './NombreAulaEditable'

export const EditarAula = ({ aula, plantilla, setPlantilla }) => {

    const handleEliminar = () => {
        if (confirm('¿Estás seguro de que deseas eliminar el aula? Se eliminaran también todas las clases que usen este aula'))
        {
            fetchEliminarAula({ codigo: aula.codigo })
            setPlantilla({
                ...plantilla,
                aulas: plantilla.aulas.filter(el => el.codigo !== aula.codigo)
            })
        }
    }

    return (
        <div className={styles.bloque}>
            <button disabled onClick={handleEliminar} className={styles.borrar}><i className="fa-solid fa-trash"></i></button>
            <NombreAulaEditable aula={aula} plantilla={plantilla} setPlantilla={setPlantilla} />
        </div>
    )
}