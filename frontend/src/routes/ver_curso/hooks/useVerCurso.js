import { useEffect, useState } from "react"

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