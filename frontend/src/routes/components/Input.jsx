import { useState } from 'react'
import styles from './Input.module.css'

const PasswordInput = ({ value, setValue, placeholder }) => {
    const [tipo, setTipo] = useState('password')
    
    const changeType = (ev) => {
        ev.preventDefault()
        if (tipo === 'texto')
            setTipo('password')
        else setTipo('texto')
    }

    return (
        <div className={styles.label}>
            <input placeholder={placeholder} className={styles.input_password} type={(tipo === 'texto' ? 'text' : 'password')} onChange={(ev) => setValue(ev.target.value)} value={value} />
            {
                (tipo === 'texto')
                    ? <i onClick={changeType} className={`fa-solid fa-eye ${styles.icono}`}></i>
                    : <i onClick={changeType} className={`fa-solid fa-eye-slash ${styles.icono}`}></i>
            }
        </div>
    )
}

export const Input = ({ type, value, setValue, placeholder = '' }) => {
    return (
        <>
            {
                (type == 'text')
                    ? <input className={styles.input} type="text" onChange={(ev) => setValue(ev.target.value)} value={value} placeholder={placeholder} />
                    : <PasswordInput value={value} setValue={setValue} placeholder={placeholder} />
            }
        </>
    )
}