import styles from './Titulo.module.css'

export const Titulo = ({ children }) => {
    return (
        <h1 className={styles.titulo}>{children}</h1>
    )
}