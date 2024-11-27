import { Titulo } from "../../components/Titulo"
import { fetchEliminarHorario } from "./helpers/fetchEliminarHorario"
import { useListaHorarios } from "./hooks/useListaHorarios"
import { ListaHorarios } from "./ListaHorarios"

import styles from './Main.module.css'
import { NuevoHorario } from "./NuevoHorario"

export const Main = () => {
    const { horarios, hayHorarios, quitarHorario, agregarHorario } = useListaHorarios()


    return (
        <main className={styles.bloque_principal}>
            <div className={styles.main}>
                <Titulo>Horarios visibles</Titulo>
                <ListaHorarios horarios={horarios} hayHorarios={hayHorarios} quitarHorario={quitarHorario} fetchEliminarHorario={fetchEliminarHorario}/>
                <NuevoHorario agregarHorario={agregarHorario} />
            </div>
        </main>
    )
}