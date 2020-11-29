const base_url = "http://localhost:3333"

const form = document.getElementById("form");
const submitBtn = document.getElementById("form-btn-submit");
const inputEmail = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");

submitBtn.addEventListener('click', () =>{
    let email = inputEmail.value;
    let password = inputPassword.value;
    let data = {
        email,
        password
    }

    console.log("####\n", email, password, "\n####");

    fetch(`${base_url}/session`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((res) => res.json())
    .then((response) => console.log(response)).catch(console.error)
})