import styles from './Atras.module.css'

export const Atras = ({ onClick }) => {
    return (
        <i className={`fa-solid fa-arrow-left ${styles.flecha}`} onClick={onClick}></i>
    )
}