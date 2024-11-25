import { useEffect } from "react";
import { useState } from "react";
import { fetchListaPlantillas } from "../helpers/fetchListaPlantillas";

export const usePlantillas = () => {
    const [plantillas, setPlantillas] = useState([])
    const [hayPlantillas, setHayPlantillas] = useState(false)

    useEffect(() => {
        if (plantillas.length > 0) {
            setHayPlantillas(true)
        } else
            setHayPlantillas(false)
    }, [plantillas])

    useEffect(() => {
        fetchListaPlantillas()
            .then(lista => {
                setPlantillas(lista)
            })
    }, [])

    const eliminarPlantilla = (codigo) => {
        setPlantillas(plantillas.filter(plantilla => plantilla.codigo !== codigo))
    }

    const crearPlantilla = ({ codigo, nombre }) => {
        setPlantillas([...plantillas, { codigo, nombre }])
    }

    return { plantillas, hayPlantillas, eliminarPlantilla, crearPlantilla }
}