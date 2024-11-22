import styles from './Validacion.module.css'

export const Validacion = ({ children }) => {
    return (
        <div className={styles.error}>{children}</div>
    )
}