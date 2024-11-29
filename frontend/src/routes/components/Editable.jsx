import styles from './Editable.module.css'

export const Editable = ({ value, setValue, editable, setEditable, onClick }) => {
    const cambiarAEditable = () => {
        setEditable(true)
    }

    return (
        <>
            {
                (!editable)
                    ? <span>
                        <span className={styles.noEditable} onClick={cambiarAEditable}>{value}</span>
                    </span>
                    : <form onSubmit={onClick}>
                        <input className={styles.editable} type="text" value={value} onChange={(ev) => setValue(ev.target.value)} />
                        <button className={styles.guardar} onClick={onClick}><i className="fa-solid fa-floppy-disk"></i></button>
                    </form>
            }
        </>
    )
}