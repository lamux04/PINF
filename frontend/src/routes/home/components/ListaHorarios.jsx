import { useNavigate } from "react-router-dom"

import styles from './ListaHorarios.module.css'

export const ListaHorarios = ({ horarios, hayHorarios, quitarHorario, fetchEliminarHorario }) => {
    const navigator = useNavigate()

    const verHorario = (codigo) => {
        navigator(`/horario/${codigo}`)
    }

    const eliminarHorario = async (codigo) => {
        if (confirm('¿Estas seguro que quieres eliminar el horario?'))
        {
            await fetchEliminarHorario({ codigo })
            quitarHorario(codigo)
        }
    }

    return (
        <ul className={styles.ul}>
            {   
                (!hayHorarios)
                    ? 'No hay horarios'
                    : horarios.map(el => (<li className={styles.li} key={el.codigo}>
                        <span className={styles.nombre}>{el.nombre}</span>
                        <div className={styles.parte_derecha}>
                            <button className={styles.ver} onClick={() => verHorario(el.codigo)}><i className="fa-solid fa-eye"></i></button>
                            <button className={styles.eliminar} onClick={() => eliminarHorario(el.codigo)}><i className="fa-solid fa-trash"></i></button>
                        </div>
                    </li>))
            }
        </ul>
    )
}