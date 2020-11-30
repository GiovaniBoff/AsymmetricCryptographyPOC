import { getPublicKey } from '../api/getPublicKey.js';
import { base_url } from '../env.js';

export const encryptMessage = async (message = 'bananas') => {
	let enc = new TextEncoder();
	let encoded = enc.encode(message);
	const publicKey = (await getPublicKey()).public_key;

	const str2ab = (str) => {
		const buf = new ArrayBuffer(str.length);
		const bufView = new Uint8Array(buf);
		for (let i = 0, strLen = str.length; i < strLen; i++) {
			bufView[i] = str.charCodeAt(i);
		}
		return buf;
	}

	const importKeyMethod = async () => {
		const pemHeader = "-----BEGIN PUBLIC KEY-----";
		const pemFooter = "-----END PUBLIC KEY-----";
		const pemContents = (publicKey.substring(pemHeader.length, publicKey.length - pemFooter.length));
		const clearPublicKey = window.atob(pemContents);
		const binaryDer = str2ab(clearPublicKey);
		return await window.crypto.subtle.importKey(
			'pkcs8',
			binaryDer,
			{
				name: "RSA-OAEP",
				modulusLength: 1024,
				hash: "SHA-256",
			},
			true,
			['encrypt']
		);
	}
	const encryptMessage = async () => {
		const importedKey = await importKeyMethod();

		return window.crypto.subtle.encrypt(
			{
				name: "RSA-OAEP",
			},
			importedKey,
			encoded
		);
	}

	try {
		const encryptedMessage = await encryptMessage();
		const jwtToken = sessionStorage.getItem('token');
		fetch(`${base_url}/teste`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				Authorization: `bearer ${jwtToken}`
			},
			body: JSON.stringify({
				email: 'bb@bb.com',
				password: window.btoa(encryptedMessage)
			})
		})
	} catch (error) {
		console.log('Deu merda', error);
	}
}