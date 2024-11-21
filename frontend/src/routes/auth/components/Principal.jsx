import { Button } from "../../components/Button"

export const Principal = ({ cambiarALogin, cambiarARegistro }) => {
    return (
        <div>
            <div>
                <p>¿No tiene una cuenta?</p>
                <Button onClick={cambiarALogin} text="Iniciar sesión"/>
            </div>
            <div>
                <p>¿Ya tiene una cuenta?</p>
                <Button onClick={cambiarARegistro} text="Registrarse"/>
            </div>
        </div>
    )
}