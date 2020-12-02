import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  // Recupera o token do headear da requisição
  const authHeader = req.headers.authorization;
  // Verifica se o token esta vazio
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // Formata o valor buscado do header
  const [, token] = authHeader.split(' ');

  try {
    // Decoda as informaçoes do token
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // Seta a variavel de requisição userId para buscas futuras no banco de dados
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
