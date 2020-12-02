import { base_url } from './env.js';

const form = document.querySelector(".form-signin");
const inputEmail = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let email = inputEmail.value;
    let password = inputPassword.value;
    
    let data = {
        email,
        password
    }

    try {
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

    } catch (error) {
        console.error(error)
    }
})