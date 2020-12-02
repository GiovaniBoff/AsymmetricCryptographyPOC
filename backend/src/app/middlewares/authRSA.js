import NodeRSA from 'node-rsa';
import rsaPrivateKey from '../../config/isNotRsaPrivateKey.json';

export default async (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    res.status(401).json({ error: 'Password not provided' });
  }

  try {
    const key_private = new NodeRSA(rsaPrivateKey.private_key);
    const decryptedPass = key_private.decrypt(password, 'utf8');
    req.decPass = decryptedPass;
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};
