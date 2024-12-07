import { useEffect, useState } from "react"
import { fetchConsultarHorario } from "../helpers/fetchConsultarHorario"

export const useHorario = (codigo) => {
    const [horario, setHorario] = useState(null)

    const consultarHorario = async ({codigo}) => {
        const data = await fetchConsultarHorario({ codigo })
        const visible = false
        
        const dataConVisibilidad = {
                ...data,
                carreras: data.carreras.map((carrera) => ({
                    ...carrera,
                    visible,
                    cursos: carrera.cursos.map((curso) => ({
                        ...curso,
                        visible,
                        asignaturas: curso.asignaturas.map((asignatura) => ({
                            ...asignatura,
                            visible,
                            clases: asignatura.clases.map((clase) => ({
                                ...clase,
                                visible: true,
                            })),
                        })),
                    })),
                })),
            };
        setHorario(dataConVisibilidad)
    }

    useEffect(() => {
        consultarHorario({codigo})
    }, [codigo])

    return { horario, setHorario }
}