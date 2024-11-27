import { useEffect, useState } from "react"
import { fetchVerCurso } from "../helpers/fetchVerCurso"

export const useVerCurso = ({ codigo }) => {
    const [curso, setCurso] = useState(null)

    const extraerCurso = async ({codigo}) => {
        const response = await fetchVerCurso({ codigo })
        if (response) {
            setCurso(response)
        }
    }

    useEffect(() => {
        extraerCurso({ codigo })
    }, [codigo])

    return { curso, setCurso }
}