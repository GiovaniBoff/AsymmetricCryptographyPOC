import NodeRSA from 'node-rsa';
import rsaPrivateKey from '../../config/isNotRsaPrivateKey.json';

export default async (req, res, next) => {
  // Captura o password no body da requisiçãp
  const { password } = req.body;

  // Verifica se o password esta vazio.
  if (!password) {
    res.status(401).json({ error: 'Password not provided' });
  }

  try {
    // Cria objeto para desincriptação
    const key_private = new NodeRSA(rsaPrivateKey.private_key);
    // Desincripta o password
    const decryptedPass = key_private.decrypt(password, 'utf8');
    // Seta variavel de requisição com a password desincriptado
    req.decPass = decryptedPass;
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};
