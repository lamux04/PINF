import { useEffect, useState } from "react"
import { fetchVerPlantilla } from "../helpers/fetchVerPlantilla"

export const useVerPlantilla = ({ codigo }) => {
    const [plantilla, setPlantilla] = useState(null)

    const extraerPlantilla = async ({codigo}) => {
        const response = await fetchVerPlantilla({ codigo })
        if (response) {
            setPlantilla(response)
        }
    }

    useEffect(() => {
        extraerPlantilla({ codigo })
    }, [codigo])

    return { plantilla, setPlantilla }
}