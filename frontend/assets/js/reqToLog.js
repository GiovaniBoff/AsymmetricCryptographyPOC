import { base_url } from './env.js';
export const reqToLog = async (data) =>{
        console.log('teste interno');
        const req = await fetch(`${base_url}/session`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        if (!req.ok) {
            throw req;
        }
        
        const response = await req.json();
        const { token } = response;
        sessionStorage.setItem('token', token);
        window.location = "/home.html"
};
