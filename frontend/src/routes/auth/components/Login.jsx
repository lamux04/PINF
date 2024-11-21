import { useState } from "react"

import { Button } from "../../components/Button"
import { Input } from "../../components/Input"

import styles from './Principal.module.css'
import styles2 from './Login.module.css'

export const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <form className={styles.bloque}>
            <h1 className={`${styles2.titulo} ${styles.bloque_elemento}`}>Iniciar sesion</h1>
            <label className={styles2.label}>
                <p className={styles.texto}>Nombre de usuario</p>
                <Input type="text" setValue={setUsername} value={username} />
            </label>
            <label className={styles2.label}>
                <p className={styles.texto}>Contraseña</p>
                <Input type="password" setValue={setPassword} value={password} />
            </label>
            <div className={styles.bloque_elemento}>
                <Button text="Iniciar"></Button>
            </div>
        </form>
    )
}