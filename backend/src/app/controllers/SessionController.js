import jwt from 'jsonwebtoken';
import UserModel from '../models/User';
import AuthConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const checkedPassword = await user.checkPassword(password);

    if (!checkedPassword) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, AuthConfig.secret, {
        expiresIn: AuthConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
