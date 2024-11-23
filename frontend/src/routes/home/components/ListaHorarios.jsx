import { useListaHorarios } from "../hooks/useListaHorarios"

export const ListaHorarios = () => {
    const { horarios, hayHorarios } = useListaHorarios()

    return (
        <ul>
            {   
                (!hayHorarios)
                    ? 'No hay horarios'
                    : horarios.map(el => <li key={el.codigo}>{el.nombre}</li>)
            }
        </ul>
    )
}