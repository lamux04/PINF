import { host } from "../../../variables";

export const fetchVerify = async () => {
    try {
        const response = await fetch(`${host}/api/auth/verify`, {
            method: 'GET',
            credentials: 'include', // Envía cookies automáticamente
        });
        
        const data = await response.json();
        if (!data.token) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        console.error('Error de red:', error);
        return false;
    }
}