import { useNavigate } from "react-router-dom"
import styles from './ListaPlantillas.module.css'
import { fetchEliminarPlantilla } from "../helpers/fetchEliminarPlantilla"

export const ListaPlantillas = ({ plantillas, hayPlantillas, eliminarPlantilla }) => {
    const navigator = useNavigate()

    const verPlantilla = (codigo) => {
        navigator(`/plantillas/${codigo}`)
    }

    const modificarPlantilla = (codigo) => {
        navigator(`/modificar_plantilla/${codigo}`)
    }

    const borrarPlantilla = async (codigo) => {
        if (confirm('¿Estas seguro que quieres eliminar la plantilla? Esto eliminará también todos los horarios creados a partir de esta plantilla.'))
        {
            await fetchEliminarPlantilla(codigo)
            eliminarPlantilla(codigo)
        }

    }

    return (
        <ul className={styles.ul}>
            {   
                (!hayPlantillas)
                    ? 'No hay plantillas'
                    : plantillas.map(el => <li className={styles.li} key={el.codigo}>
                        <span className={styles.nombre}>{el.nombre}</span>
                        <div className={styles.parte_derecha}>
                            <button className={styles.ver} onClick={() => verPlantilla(el.codigo)}><i className="fa-solid fa-eye"></i></button>
                            <button className={styles.ver} onClick={() => modificarPlantilla(el.codigo)}><i className="fa-solid fa-pen"></i></button>
                            <button className={styles.eliminar} disabled onClick={() => borrarPlantilla(el.codigo)}><i className="fa-solid fa-trash"></i></button>
                        </div>
                    </li>)
            }
        </ul>
    )
}