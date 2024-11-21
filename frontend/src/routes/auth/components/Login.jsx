import { Button } from "../../components/Button"

export const Login = () => {
    return (
        <div>
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
                <Button text="Iniciar"></Button>
            </div>
        </div>
    )
}