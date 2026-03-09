import styles from './Plantillas.module.css'
import { Menu } from '../components/Menu'
import { useVerificar } from '../hooks/useVerificar'
import { Main } from './components/Main'

export const Plantillas = () => {
    useVerificar()

    return (
        <>
            <Menu />
            <Main />
        </>
    )
}