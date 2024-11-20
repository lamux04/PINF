import logo from '../assets/logo.svg'
import '../styles/inicio-sesion.css'
import '../styles/IniciarSesion.css'


export const IniciarSesion = () => {
    return (
        <main>
            <img src={logo} alt="Logo de Sched4All" />
            <div className='bloque bloque-iniciar-sesion'>
                <div>
                    <h1>Incio de sesion</h1>
                </div>
                <div>
                    <p>Nombre de usuario</p>
                    <input type="text" name="" id=""/>
                </div>
                <div>
                    <p>Contraseña</p>
                    <input type="password" name="" id=""/>
                </div>
                <div>
                    <button className='button'>Iniciar</button>
                </div>
            </div>
        </main>
    )
}