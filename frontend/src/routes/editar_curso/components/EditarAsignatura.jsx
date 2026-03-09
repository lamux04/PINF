import styles from './EditarAsignatura.module.css'

import { useState } from 'react'
import { Titulo3 } from '../../components/Titulo3'
import { MiniValidacion } from '../../components/MiniValidacion'
import { NombreAsignaturaEditable } from './NombreAsignaturaEditable'
import { NuevaClase } from './NuevaClase'
import { fetchEliminarCurso } from '../helpers/fetchEliminarCurso'
import { fetchEliminarAsignatura } from '../helpers/fetchEliminarAsignatura'

export const EditarAsignatura = ({ asignatura, curso, setCurso}) => {
    const [validacion, setValidacion] = useState('')

    const handleEliminarAsignatura = async () => {
        if (!confirm('¿Estás seguro de que deseas eliminar la asignatura? Se eliminarán también todas las clases de la asignatura'))
            return
        await fetchEliminarAsignatura({ codigo: asignatura.codigo })

        setCurso({
            ...curso,
            asignaturas: curso.asignaturas.filter(asignaturaMap => asignaturaMap.codigo !== asignatura.codigo)
        })
    }

    const handleEliminar = async (codigo) => {
        await fetchEliminarCurso({ codigo })

        setCurso({
            ...curso,
            asignaturas: curso.asignaturas.map(asignaturaMap => {
                if (asignaturaMap.codigo === asignatura.codigo) {
                    return {
                        ...asignaturaMap,
                        clases: asignaturaMap.clases.filter(clase => clase.codigo !== codigo)
                    }
                }
                return asignaturaMap
            })
        })
    }

    const clasesOrdenadas = [...asignatura.clases].sort((a, b) => a.tipo.localeCompare(b.tipo))

    return (
        <span className={styles.bloque_asignatura}>
            <Titulo3>
                <span className={styles.bloque_titulo}>
                    <span className={styles.titulo}>
                        <span className={styles.titulo}>
                            <NombreAsignaturaEditable curso={curso} setCurso={setCurso} asignatura={asignatura} />
                        </span>
                    </span>
                    <button onClick={() => handleEliminarAsignatura()} className={styles.borrar}><i className="fa-solid fa-trash"></i></button>
                </span>
            </Titulo3>
            <p><span className={styles.clave}>Aprobable:</span> {asignatura.aprobabilidad ? 'SI' : 'NO'}</p>
            <h4 className={styles.h4}>Clases</h4>
            <span className={styles.agregar}>
                <MiniValidacion>{validacion}</MiniValidacion>
                <NuevaClase asignatura={asignatura} curso={curso} setCurso={setCurso} setValidacion={setValidacion} />
            </span>
            <div className={styles.bloque}>
                {
                    (asignatura.clases.length !== 0)
                    ?   clasesOrdenadas.map((clase) => (
                            <details className={styles.details} key={clase.codigo}>
                            <summary className={styles.summary}>
                                <span className={styles.nombre_details}>
                                    {clase.tipo} - {clase.duracion} minutos
                                </span>
                                <button onClick={() => handleEliminar(clase.codigo)} className={styles.borrar}><i className="fa-solid fa-trash"></i></button>
                            </summary>
                                <div className={styles.bloque_clase}>
                                    
                                    <p><span className={styles.clave}>Tipo: </span><span>{clase.tipo}</span></p>
                                    <p><span className={styles.clave}>Duración: </span><span>{clase.duracion} minutos</span></p>
                                    <p><span className={styles.clave}>Importante: </span><span>{clase.importante ? 'SI' : 'NO'}</span></p>
                                    <p><span className={styles.clave}>Profesor: </span><span>{clase["profesor nombre"]} </span></p>
                                    <p><span className={styles.clave}>Tipo de aula: </span><span>{clase["tipo aula"]} </span></p>
                                </div>
                            </details>
                        ))
                    :   <p>No hay clases</p>
                }
            </div>
        </span>
    )
}