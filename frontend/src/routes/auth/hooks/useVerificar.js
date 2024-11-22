import { useEffect } from "react"
import { fetchVerify } from "../helpers/fetchVerify"
import { useNavigate } from "react-router-dom"

export const useVerificar = () => {
    const navigate = useNavigate()

    useEffect(() => {
        fetchVerify()
            .then((autenticado) => {
                if (!autenticado) {
                    navigate('/auth')
                } else {
                    if (window.location.pathname === '/auth') {
                        navigate('/home')
                    }
                }
            })
    }, [navigate])
}