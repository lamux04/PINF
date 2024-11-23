import { Titulo } from "../../components/Titulo"
import { ListaHorarios } from "./ListaHorarios"
import styles from './Main.module.css'

export const Main = () => {
    return (
        <main className={styles.bloque_principal}>
            <div className={styles.main}>
                <Titulo>Horarios visibles</Titulo>
                <ListaHorarios></ListaHorarios>
            </div>
        </main>
    )
}