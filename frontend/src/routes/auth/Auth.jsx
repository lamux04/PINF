import { useState } from 'react'

// Importamos el logo
import logoN from '../../assets/logoN.svg'
import logoB from '../../assets/logoB.svg'

// Importamos los componentes
import { Principal } from './components/Principal'
import { Login } from './components/Login'
import { Register } from './components/Register'

// Estilos
import styles from './Auth.module.css'
import { useVerificar } from '../hooks/useVerificar'
import { Validacion } from '../components/Validacion'
import { CambiarTema } from '../components/CambiarTema'

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
            <CambiarTema />
            {validacion !== '' && <Validacion>{validacion}</Validacion>}
            
            <div className={styles.bloque}>
                
                <img className={styles.logo} src={logoN} alt="Logo de Shed4All" onClick={() => navigator('/home')} />
                
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