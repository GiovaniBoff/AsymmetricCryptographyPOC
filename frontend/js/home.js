import { encryptMessage } from './helpers/encrypt.js';

const button = document.querySelector('.get-things');

button.addEventListener('click', () => {
    encryptMessage();
});
