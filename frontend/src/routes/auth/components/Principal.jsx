import styles from './Principal.module.css'

import { Button } from "../../components/Button"


export const Principal = ({ cambiarALogin, cambiarARegistro }) => {
    return (
        <div className={styles.bloque}>
            <div className={styles.bloque_elemento}>
                <p className={styles.texto}>¿Ya tiene una cuenta?</p>
                <Button onClick={cambiarALogin} text="Iniciar sesión"/>
            </div>
            <div className={styles.bloque_elemento}>
                <p className={styles.texto}>¿No tiene una cuenta?</p>
                <Button onClick={cambiarARegistro} text="Registrarse"/>
            </div>
        </div>
    )
}