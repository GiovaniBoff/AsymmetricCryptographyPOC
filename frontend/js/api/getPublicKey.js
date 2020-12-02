import { base_url } from '../env.js';
export const getPublicKey = async () => {
    const jwtToken = sessionStorage.getItem('token');

    const req = await fetch(`${base_url}/getPublicKey`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${jwtToken}`
        }
    });

    const response = await req.json();

    if (!req.ok) {
        throw response;
    }

    return response;
}