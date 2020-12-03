import { getPublicKey } from '../api/getPublicKey.js';
import { base_url } from '../env.js';

export const encryptMessage = async (message) => {
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
	const arrayBufferToBase64 = (buffer) => {
		var binary = '';
		var bytes = new Uint8Array(buffer);
		var len = bytes.byteLength;
		for (var i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return window.btoa(binary);
	}

	const importKeyMethod = async () => {
		const pemHeader = "-----BEGIN PUBLIC KEY-----";
		const pemFooter = "-----END PUBLIC KEY-----";
		const pemContents = (publicKey.substring(pemHeader.length, publicKey.length - pemFooter.length));
		const clearPublicKey = window.atob(pemContents);
		const binaryDer = str2ab(clearPublicKey);
		return await window.crypto.subtle.importKey(
			'spki',
			binaryDer,
			{
				name: "RSA-OAEP",
				modulusLength: 1024,
				hash: "SHA-1",
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

	return arrayBufferToBase64(await encryptMessage())
}