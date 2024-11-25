import { host } from '../../../variables'

export const fetchListaPlantillas = async () => {
    const response = await fetch(`${host}/api/plantilla/lista_plantillas`, {
        method: 'GET',
        credentials: 'include'
    })
    const data = await response.json()
    return data.plantillas
}