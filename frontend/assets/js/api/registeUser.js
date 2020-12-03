import { base_url } from '../env.js';
import { login } from './login.js';

export const registerUser = async (data) => {
    
    const req = await fetch(`${base_url}/users`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!req.ok) {
        const errorResponse = await req.json();
        throw errorResponse;
    }
    
    await login({
        email: data.email,
        password: data.password,
    });
}
