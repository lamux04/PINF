import styles from './Main.module.css'

import { Atras } from '../../components/Atras'
import { useVerCurso } from '../hooks/useVerCurso'
import { Titulo } from '../../components/Titulo'

export const Main = ({ codigo }) => {
    const [curso, nombreCarrera] = useVerCurso({ codigo })

    return (
        <main className={styles.bloque_principal}>
            <Atras onClick={() => navigator('/plantillas')} />
            {
                (curso) && 
                    <div className={styles.main}>
                        <Titulo>{nombreCarrera} - {curso.nombre}</Titulo>
                    </div>
            }
        </main>
    )
}