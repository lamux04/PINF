import { useVerificar } from "../hooks/useVerificar"
import { Menu } from "../components/Menu"
import { Main } from "./components/Main"

export const Home = () => {
    useVerificar()

    return (
        <>
            <Menu />
            <Main />
        </>
    )
}