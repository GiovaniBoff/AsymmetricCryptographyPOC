const base_url = "http://localhost:3333"

const form = document.getElementById("form");
const submitBtn = document.getElementById("form-btn-submit");
const inputEmail = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");

submitBtn.addEventListener('click', async () => {
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
        }).then((res) => res.json());

        const { token } = req;
        sessionStorage.setItem('token', token);
        window.location = "/home.html"
    } catch (error) {
        console.error(error)
    }
})