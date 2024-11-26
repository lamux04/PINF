import { useState } from 'react'
import styles from './Input.module.css'

const PasswordInput = ({ value, setValue, placeholder, disabled }) => {
    const [tipo, setTipo] = useState('password')
    
    const changeType = (ev) => {
        ev.preventDefault()
        if (tipo === 'texto')
            setTipo('password')
        else setTipo('texto')
    }

    return (
        <div className={styles.label}>
            <input disabled={disabled} placeholder={placeholder} className={styles.input_password} type={(tipo === 'texto' ? 'text' : 'password')} onChange={(ev) => setValue(ev.target.value)} value={value} />
            {
                (tipo === 'texto')
                    ? <i onClick={changeType} className={`fa-solid fa-eye ${styles.icono}`}></i>
                    : <i onClick={changeType} className={`fa-solid fa-eye-slash ${styles.icono}`}></i>
            }
        </div>
    )
}

export const Input = ({ type, value, setValue, placeholder = '', disabled = false }) => {
    return (
        <>
            {
                (type == 'text')
                    ? <input disabled={disabled} className={styles.input} type="text" onChange={(ev) => setValue(ev.target.value)} value={value} placeholder={placeholder} />
                    : <PasswordInput disabled={disabled} value={value} setValue={setValue} placeholder={placeholder} />
            }
        </>
    )
}