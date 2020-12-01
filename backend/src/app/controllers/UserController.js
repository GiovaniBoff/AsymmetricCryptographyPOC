import User from '../models/User';
import rsaPrivateKey from '../../config/isNotRsaPrivateKey.json';

const NodeRSA = require('node-rsa');

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id, name, email, provider } = await User.create(req.body);
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async index(req, res) {
    // const user = await User.findByPk(req.userId);

    return res.status(200).json({ bla: 'bla' });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }
    try {
      const checkedPassword = await user.checkPassword(oldPassword);
      if (oldPassword && !checkedPassword) {
        return res.status(401).json({ error: 'Password does not match' });
      }
      const { name } = await user.update(req.body);
      return res.status(200).json({ name, email });
    } catch (er) {
      return res.status(401).json({ er });
    }
  }

  async getPublicKey(req, res) {
    res.status(200).json({ public_key: rsaPrivateKey.public_key });
  }
}

export default new UserController();
