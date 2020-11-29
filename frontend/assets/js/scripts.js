const base_url = "http://localhost:3333"

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
        
        response = await req.json();
        console.log(response);
        const { token } = response;
        sessionStorage.setItem('token', token);
        window.location = "/home.html"
    } catch (error) {
        console.error(error)
    }
})