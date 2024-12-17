import { fetchEliminarAula } from '../helpers/fetchEliminarAula'
import styles from './EditarAula.module.css'

import { NombreAulaEditable } from './NombreAulaEditable'

export const EditarAula = ({ aula, plantilla, setPlantilla }) => {

    const handleEliminar = () => {
        fetchEliminarAula({ codigo: aula.codigo })
        setPlantilla({
            ...plantilla,
            aulas: plantilla.aulas.filter(el => el.codigo !== aula.codigo)
        })
    }

    return (
        <div className={styles.bloque}>
            <button disabled onClick={handleEliminar} className={styles.borrar}><i className="fa-solid fa-trash"></i></button>
            <NombreAulaEditable aula={aula} plantilla={plantilla} setPlantilla={setPlantilla} />
        </div>
    )
}