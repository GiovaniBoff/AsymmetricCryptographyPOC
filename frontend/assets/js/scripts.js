import { login }  from './api/login.js';
import { registerUser } from './api/registeUser.js';

const form = document.querySelector(".form-signin");
const inputEmail = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");
const formRegister = document.querySelector("#form-modal");
const inputNameRegister = document.getElementById("inputNameRegister");
const inputEmailRegister = document.getElementById("inputEmailRegister");
const inputPasswordRegister = document.getElementById("inputPasswordRegister");


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let email = inputEmail.value;
    let password = inputPassword.value;
    
    let data = {
        email,
        password
    }

    try {
        await login(data);
    } catch (error) {
        console.error(error)
    }
})

formRegister.addEventListener('submit', async (e) => {
    e.preventDefault();
    let name = inputNameRegister.value;
    let email = inputEmailRegister.value;
    let password = inputPasswordRegister.value;
    let data = {
        name,
        password,
        email
    }

    try {
        await registerUser(data);
    } catch (error) {
        if(body.error === 'User already exists'){
            const errorDiv = document.querySelector('.errorMessage');
            errorDiv.classList.add('visible');
        }
    } 
})

