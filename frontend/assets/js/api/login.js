import { base_url } from '../env.js';
export const login = async (data) => {
    const req = await fetch(`${base_url}/session`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const response = await req.json();
    if (!req.ok) {
        throw response;
    }
    
    const { token } = response;
    sessionStorage.setItem('token', token);
    window.location = "/home.html"
};
