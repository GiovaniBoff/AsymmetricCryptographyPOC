import { base_url } from './env.js';
import { reqToLog }  from './reqToLog.js'
const form = document.querySelector(".form-signin");
const inputEmail = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");
const formModal = document.querySelector("#form-modal");
const inputNameRegister = document.getElementById("inputNameRegister");
const inputEmailRegister = document.getElementById("inputEmailRegister");
const inputPasswordRegister = document.getElementById("inputPasswordRegister");


form.addEventListener('submit',(e) => {
    e.preventDefault();
    let email = inputEmail.value;
    let password = inputPassword.value;
    let data = {
        email,
        password
    }

    try {
        reqToLog(data);
    } catch (error) {
        console.error(error)
    }
})

formModal.addEventListener('submit', async (e) => {
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
        const req = await fetch(`${base_url}/users`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log(data);

        if (!req.ok) {
            throw req;
        }
        
        reqToLog({
            email,
            password
        });
        
    } catch (error) {
        error.json().then((body) => {
            if(body.error === 'User already exists'){
                const errorDiv = document.querySelector('.errorMessage');
                errorDiv.classList.add('visible');
            }             
        });
    }
})

