import styles from './Main.module.css'

import { useNavigate } from "react-router-dom"
import { Atras } from "../../components/Atras"
import { Titulo } from '../../components/Titulo'
import { useVerPlantilla } from '../hooks/useVerPlantilla'
import { VerCarreras } from './VerCarreras'
import { VerProfesores } from './VerProfesores'
import { VerAulas } from './VerAulas'
import { HorariosGenerados } from './HorariosGenerados'

export const Main = ({ codigo }) => {
    const navigator = useNavigate()
    const { plantilla } = useVerPlantilla({ codigo })

    return (
        <main className={styles.bloque_principal}>
            <Atras onClick={() => navigator('/plantillas')} />
            {
                (plantilla) && 
                    <div className={styles.main}>
                        <Titulo>Plantilla - {plantilla.nombre}</Titulo>
                        <HorariosGenerados codigo={codigo} />
                        <div className={styles.bloque}>
                            <p><span className={styles.clave}>Código:</span> {plantilla.codigo}</p>
                            <p><span className={styles.clave}>Nombre:</span> {plantilla.nombre}</p>
                        </div>
                        <VerCarreras carreras={plantilla.carreras} />
                        <VerProfesores profesores={plantilla.profesores} />
                        <VerAulas aulas={plantilla.aulas} />
                    </div>
            }
        </main>
    )
}