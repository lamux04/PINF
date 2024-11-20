import '../styles/inicio-sesion.css'
import '../styles/Login.css'
import logo from '../assets/logo.svg'

export const Login = () => {
    return (
        <main>
            <img src={logo} alt="Logo de Sched4All" />
            <div className='bloque bloque-login'>
                <div>
                    <p>¿No tiene una cuenta?</p>
                    <a className='button' href="/iniciar_sesion">Iniciar sesión</a>
                </div>
                <div>
                    <p>¿Ya tiene una cuenta?</p>
                    <a className='button' href="/registrarse">Registrarse</a>
                </div>
            </div>
        </main>
    )
}