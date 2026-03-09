import styles from './Checkbox.module.css'

export const Checkbox = ({ id, label, checked, onChange }) => {
    return (
        <>
            <input id={id} className={styles.checkbox} type="checkbox" placeholder='Nombre asignatura' checked={checked} onChange={onChange} />
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>
        </>
    )
}