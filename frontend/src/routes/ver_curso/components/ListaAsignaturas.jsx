import styles from './ListaAsignaturas.module.css'

import { Titulo2 } from '../../components/Titulo2'
import { ListaClases } from './ListaClases'
import React from 'react'

export const ListaAsignaturas = ({ asignaturas }) => {
    const asignaturasOrdenadas = [...asignaturas].sort((a, b) => a.nombre.localeCompare(b.nombre))

    return (
        <>
            {
                (asignaturas.length === 0)
                    ? <p>No hay asignaturas</p>
                    : asignaturasOrdenadas.map(el => (
                        <React.Fragment key={el.codigo}>
                            <Titulo2>{el.nombre}</Titulo2>
                            
                            <ListaClases clases={el.clases} />
                        </React.Fragment>
                    ))
            }
        </>
    )
}