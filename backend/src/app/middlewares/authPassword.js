import User from '../models/User';

export default async (req, res, next) => {
  const password = req.decPass;

  if (!password) {
    return res.status(401).json({ error: 'Password not provided' });
  }

  const user = await User.findByPk(req.userId);
  const checkedPassword = await user.checkPassword(password);

  if (!checkedPassword) {
    return res.status(401).json({ error: 'Password not match' });
  }
  return next();
};
