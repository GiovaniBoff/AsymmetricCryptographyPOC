import './services/protectPage.js';
import { encryptMessage } from './services/encrypt.js';

const button = document.querySelector('.get-things');

button.addEventListener('click', () => {
    encryptMessage();
});
