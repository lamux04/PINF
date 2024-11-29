import styles from './Titulo3.module.css'

export const Titulo3 = ({ children }) => {
    return (
        <span className={styles.h3}>{children}</span>
    )
}