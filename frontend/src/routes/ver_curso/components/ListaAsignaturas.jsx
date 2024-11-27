import styles from './ListaAsignaturas.module.css'

export const ListaAsignaturas = ({ asignaturas }) => {
    return (
        <>
            {
                (asignaturas.length === 0)
                    ? <p>No hay asignaturas</p>
                    : asignaturas.map(el => (
                        <li key={el.codigo}>{el.nombre}</li>
                    ))
            }
        </>
    )
}