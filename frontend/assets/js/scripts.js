const base_url = "http://localhost:3333"

const formLogin = document.getElementById("form-login");
const formCreateAcc = document.getElementById("form-create-acc");
const modalOpenBtn = document.getElementById("create-acc-btn");
const modalCloseBtn = document.querySelector(".modal-wrapper>span");
const modalCreateAcc = document.querySelector(".modal-create-acc");

formCreateAcc.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = formCreateAcc.nome.value;
    const email = formCreateAcc.email.value;
    const password = formCreateAcc.password.value;
    const data = {
        name,
        email,
        password
    }

    try {
        const req = await fetch(`${base_url}/users`, {
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
        console.log("########### DEU CERTO PORRA! ############")
    } catch (error) {
        console.error(error)
    }

})

formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = formLogin.email.value;
    const password = formLogin.password.value;
    const data = {
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


//HELPERS
modalOpenBtn.onclick = toggleModal;
modalCloseBtn.onclick = toggleModal;
modalCreateAcc.onclick = (e) => {
    if(e.target == modalCreateAcc){
        toggleModal();
    }
}

function toggleModal(){
    modalCreateAcc.classList.toggle("toggle");
}
//#######
