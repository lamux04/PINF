import { useState } from 'react'

// Importamos el logo
import logo from '../../assets/logo.svg'

// Importamos los componentes
import { Principal } from './components/Principal'
import { Login } from './components/Login'
import { Register } from './components/Register'

// Estilos
import styles from './Auth.module.css'
import { useVerificar } from '../hooks/useVerificar'
import { Validacion } from '../components/Validacion'

export const Auth = () => {
    const [formato, setFormato] = useState('default')

    const cambiarALogin = () => {
        setFormato('login')
    }

    const cambiarARegistro = () => {
        setFormato('registro')
    }

    const volverAtras = () => {
        setFormato('default')
    }

    // Comprobamos que el usuario no este autenticado
    useVerificar()

    // Validaciones

    const [validacion, setValidacion] = useState('')

    return (
        <main className={styles.main}>
            {validacion !== '' && <Validacion>{validacion}</Validacion>}
            
            <div className={styles.bloque}>
                <img src={logo} alt="Logo de Sched4All" className={styles.logo}/>
                {
                    formato == 'default'
                        ? <Principal cambiarALogin={cambiarALogin} cambiarARegistro={cambiarARegistro} />
                        : formato == 'login'
                            ? <Login volverAtras={volverAtras} modificarError={setValidacion} />
                            : <Register volverAtras={volverAtras} modificarError={setValidacion} />
                }
            </div>
        </main>
    )
}