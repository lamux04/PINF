import { Titulo2 } from '../../components/Titulo2'
import styles from './ListaAsignaturas.module.css'
import { ListaClases } from './ListaClases'

export const ListaAsignaturas = ({ asignaturas }) => {
    return (
        <>
            {
                (asignaturas.length === 0)
                    ? <p>No hay asignaturas</p>
                    : asignaturas.map(el => (
                        <>
                            <Titulo2 key={el.codigo}>{el.nombre}</Titulo2>
                            <ListaClases key={el.codigo} clases={el.clases} />
                        </>
                    ))
            }
        </>
    )
}