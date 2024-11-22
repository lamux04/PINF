import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { Atras } from "../../components/Atras"

import styles from './Principal.module.css'
import styles2 from './Login.module.css'
import { fetchLogin } from "../helpers/fetchLogin"

export const Login = ({ volverAtras, modificarError }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleLogin = async (ev) => {
        ev.preventDefault()
        fetchLogin({ username, password })
            .then(error => {
                if (error) modificarError('El usuario o contraseña es incorrecto')
                else navigate('/home')
            })
    }

    return (
        <form className={styles.bloque}>
            <Atras onClick={volverAtras} />
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
                <Button text="Iniciar" onClick={handleLogin}></Button>
            </div>
        </form>
    )
}