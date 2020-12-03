import NodeRSA from 'node-rsa';
import rsaPrivateKey from '../../config/isNotRsaPrivateKey.json';

export default (message) => {
  // Captura o password no body da requisiçãp

  // Verifica se o password esta vazio.
  if (!message) {
    throw new Error('Message is empty');
  }

  // Cria objeto para desincriptação
  const key_private = new NodeRSA(rsaPrivateKey.private_key);
  // Desincripta message
  const decryptedMessage = key_private.decrypt(message, 'utf8');
  // Seta variavel de requisição com a password desincriptado
  return decryptedMessage;
};
