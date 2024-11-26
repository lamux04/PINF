import styles from './Titulo2.module.css'

export const Titulo2 = ({ children }) => {
    return (
        <h2 className={styles.h2}>{children}</h2>
    )
}