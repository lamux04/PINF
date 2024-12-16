import { useEffect, useState } from "react"
import { Titulo } from "../../components/Titulo"
import { fetchEliminarHorario } from "./helpers/fetchEliminarHorario"
import { useListaHorarios } from "./hooks/useListaHorarios"
import { ListaHorarios } from "./ListaHorarios"

import styles from './Main.module.css'
import { NuevoHorario } from "./NuevoHorario"

export const Main = () => {
    const { horarios, hayHorarios, quitarHorario, agregarHorario } = useListaHorarios()
    const [horariosGenerados, setHorariosGenerados] = useState([])

    useEffect(() => {
        setHorariosGenerados([...horarios].sort((a, b) => a.nombre.localeCompare(b.nombre)))
    }, [horarios])


    return (
        <main className={styles.bloque_principal}>
            <div className={styles.main}>
                <Titulo>Horarios visibles</Titulo>
                <ListaHorarios horarios={horariosGenerados} hayHorarios={hayHorarios} quitarHorario={quitarHorario} fetchEliminarHorario={fetchEliminarHorario}/>
                <NuevoHorario agregarHorario={agregarHorario} />
            </div>
        </main>
    )
}