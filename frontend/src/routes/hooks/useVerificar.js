import { useContext, useEffect } from "react"
import { fetchVerify } from "../helpers/fetchVerify"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserContext"

export const useVerificar = () => {
    const { setUsername } = useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {
        fetchVerify()
            .then((username) => {
                if (!username) {
                    navigate('/auth')
                } else {
                    setUsername(username)
                    if (window.location.pathname === '/auth') {
                        navigate('/home')
                    }
                }
            })
    }, [navigate, setUsername])
}