import styles from './Main.module.css'

import { useNavigate } from "react-router-dom"
import { useVerPlantilla } from "../../ver_plantilla/hooks/useVerPlantilla"
import { Atras } from '../../components/Atras'
import { Titulo } from '../../components/Titulo'
import { EditarCarreras } from './EditarCarreras'
import { EditarProfesores } from './EditarProfesores'
import { EditarAulas } from './EditarAulas'
import { NombreEditable } from './NombreEditable'

export const Main = ({ codigo }) => {
    const navigator = useNavigate()
    const { plantilla, setPlantilla } = useVerPlantilla({ codigo })
    
    return (
        <main className={styles.bloque_principal}>
            <Atras onClick={() => navigator('/plantillas')} />
            {
                (plantilla) && 
                    <div className={styles.main}>
                        <Titulo>Plantilla - {plantilla.nombre}</Titulo>
                        <div className={styles.bloque}>
                            <p><span className={styles.clave}>Código:</span> {plantilla.codigo}</p>
                            <NombreEditable plantilla={plantilla} setPlantilla={setPlantilla} />
                        </div>
                        <EditarCarreras plantilla={plantilla} setPlantilla={setPlantilla} />
                        <EditarProfesores plantilla={plantilla} setPlantilla={setPlantilla} />
                        <EditarAulas plantilla={plantilla} setPlantilla={setPlantilla} />
                    </div>
            }
        </main>
    )
}