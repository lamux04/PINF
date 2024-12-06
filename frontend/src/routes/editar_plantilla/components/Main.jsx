import styles from './Main.module.css'

import { useNavigate } from "react-router-dom"
import { useVerPlantilla } from "../../ver_plantilla/hooks/useVerPlantilla"
import { Atras } from '../../components/Atras'
import { Titulo } from '../../components/Titulo'
import { EditarCarreras } from './EditarCarreras'
import { EditarProfesores } from './EditarProfesores'
import { EditarAulas } from './EditarAulas'
import { NombreEditable } from './NombreEditable'

import Modal from 'react-modal'
import { useState } from 'react'

export const Main = ({ codigo }) => {
    const navigator = useNavigate()
    const { plantilla, setPlantilla } = useVerPlantilla({ codigo })
    const [modalIsOpen, setModalIsOpen] = useState(true);
    
    return (
        <>
            {
                (modalIsOpen)
                ?
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalIsOpen(false)}
                        style={{
                            overlay: {
                                backgroundColor: "rgba(0, 0, 0, 0.5)"
                            },
                            content: {
                                color: "black",
                                margin: "auto",
                                width: "700px",
                                height: "300px",
                                padding: "20px",
                                borderRadius: "10px"
                            }
                        }}
                    >
                        <div className={styles.modal}>
                            <Titulo>⚠️ Aviso</Titulo>
                            <p className={styles.p}>Si editas algo de la plantilla se eliminarán todos los horarios creados a partir de la misma.</p>
                            <button className={styles.button} onClick={() => setModalIsOpen(false)}>Cerrar</button>
                        </div>
                    </Modal>
                :
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
            }
        
        </>
    )
}