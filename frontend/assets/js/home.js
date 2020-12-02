import { encryptMessage } from './helpers/encrypt.js';

import { base_url } from './env.js';

const userName = document.querySelector('.user-name');

window.addEventListener('load', async () => {
    const sessionToken = sessionStorage.getItem('token');

    const req = await fetch(`${base_url}/users`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${sessionToken}`
        }
    });

    const { name } = await req.json()

    userName.innerHTML = name
})
