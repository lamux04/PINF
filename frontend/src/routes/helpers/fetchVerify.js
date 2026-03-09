import { host } from "../../variables";

export const fetchVerify = async () => {
    try {
        const response = await fetch(`${host}/api/auth/verify`, {
            method: 'GET',
            credentials: 'include', // Envía cookies automáticamente
        });
        
        const data = await response.json();
        return data.username
    } catch (error) {
        return error;
    }
}