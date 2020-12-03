import jwt from 'jsonwebtoken';
import UserModel from '../models/User';
import AuthConfig from '../../config/auth';
import decrypt from '../service/decrypt';

class SessionController {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const decryptedPassword = decrypt(password);
    console.log(`decryptPassword ====>>> ${password}`);

    const checkedPassword = await user.checkPassword(decryptedPassword);

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
