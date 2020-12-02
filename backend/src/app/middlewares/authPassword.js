import User from '../models/User';

export default async (req, res, next) => {
  // Recupera o password desincriptado
  const password = req.decPass;

  if (!password) {
    return res.status(401).json({ error: 'Password not provided' });
  }

  // Busca o usuario no banco
  const user = await User.findByPk(req.userId);
  // Chama o metodo para a verificação do password
  const checkedPassword = await user.checkPassword(password);

  // Verifica se o password esta correto
  if (!checkedPassword) {
    return res.status(401).json({ error: 'Password not match' });
  }

  return next();
};
