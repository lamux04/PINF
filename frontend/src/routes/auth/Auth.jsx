import { useState } from 'react'

// Importamos el logo
import logo from '../../assets/logo.svg'

// Importamos los componentes
import { Principal } from './components/Principal'
import { Login } from './components/Login'
import { Register } from './components/Register'

// Estilos
import styles from './Auth.module.css'

export const Auth = () => {
    const [formato, setFormato] = useState('default')

    const cambiarALogin = () => {
        setFormato('login')
    }

    const cambiarARegistro = () => {
        setFormato('registro')
    }

    return (
        <main className={styles.bloque}>
            <img src={logo} alt="Logo de Sched4All" className={styles.logo}/>
            {
                formato == 'default'
                    ? <Principal cambiarALogin={cambiarALogin} cambiarARegistro={cambiarARegistro} />
                    : formato == 'login'
                        ? <Login />
                        : <Register />
            }
            
        </main>
    )
}