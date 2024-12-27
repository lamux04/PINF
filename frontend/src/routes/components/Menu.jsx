import styles from './Menu.module.css'
import logoN from '../../assets/logoN.svg'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { fetchCerrarSesion } from '../helpers/fetchCerrarSesion'
import { CambiarTema } from './CambiarTema'

export const Menu = () => {
    const { username } = useContext(UserContext)
    const navigator = useNavigate()

    const cerrarSesion = async () => {
        await fetchCerrarSesion()
        navigator('/auth')
    }

    return (
        <div className={styles.bloque}>
            <nav className={styles.menu}>
                <div className={styles.bloque_izquierda}>
                    <img className={styles.img} src={logoN} alt="Logo de Shed4All" onClick={() => navigator('/home')} />
                </div>
                <div className={styles.bloque_derecha}>
                    <a className={styles.enlace} onClick={() => navigator('/home')}>Home</a>
                    <a className={styles.enlace} onClick={() => navigator('/plantillas')}>Mis plantillas</a>
                    <a className={styles.enlace} onClick={cerrarSesion}>Cerrar sesión</a>
                    <span className={styles.texto}>{username}</span>
                    <CambiarTema/>
                </div>
            </nav>
        </div>
    )
}