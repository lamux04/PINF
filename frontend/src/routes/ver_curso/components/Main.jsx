import styles from './Main.module.css'

import { Atras } from '../../components/Atras'
import { useVerCurso } from '../hooks/useVerCurso'
import { Titulo } from '../../components/Titulo'
import { ListaAsignaturas } from './ListaAsignaturas'
import { useNavigate } from 'react-router-dom'

export const Main = ({ codigo }) => {
    const { curso } = useVerCurso({ codigo })
    const navigator = useNavigate()

    return (
        <main className={styles.bloque_principal}>
            <Atras onClick={() => navigator(`/plantillas/${curso.plant_cod}`)} />
            {
                (curso) && 
                    <div className={styles.main}>
                        <Titulo>{curso.plant_nombre} - {curso.carre_nombre} - {curso.nombre}</Titulo>
                        <div className={styles.bloque}>
                            <p><span className={styles.clave}>Código: </span><span>{curso.codigo}</span></p>
                            <p><span className={styles.clave}>Nombre: </span><span>{curso.nombre}</span></p>
                        </div>
                        <ListaAsignaturas asignaturas={curso.asignaturas} />
                    </div>
            }
        </main>
    )
}