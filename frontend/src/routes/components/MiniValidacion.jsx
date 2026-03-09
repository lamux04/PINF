import styles from './MiniValidacion.module.css'

export const MiniValidacion = ({ children }) => {
    return (
        <>
            {
                (children !== '')
                && <span className={styles.validacion}>{children}</span>
            }
        </>
    )
}