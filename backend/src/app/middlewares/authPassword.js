import User from '../models/User';
import decrypt from '../service/decrypt';

export default async (req, res, next) => {
  // Recupera o password desincriptado
  const { password } = req.body;

  if (!password) {
    return res.status(401).json({ error: 'Password not provided' });
  }

  try {
    const decryptedPassword = decrypt(password);
    // Busca o usuario no banco
    const user = await User.findByPk(req.userId);
    // Chama o metodo para a verificação do password
    const checkedPassword = await user.checkPassword(decryptedPassword);

    // Verifica se o password esta correto
    if (!checkedPassword) {
      return res.status(401).json({ error: 'Password not match' });
    }
    return next();
  } catch (error) {
    res.status(401).json({ error: 'Backend cannot decrypt' });
  }
};
