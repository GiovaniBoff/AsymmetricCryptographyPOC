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

    const response = await req.json();
    if (!req.ok) {
        throw response;
    }
    
    const bodyData = {
        ...data
    }

    delete bodyData.name;
    login(bodyData);
}
