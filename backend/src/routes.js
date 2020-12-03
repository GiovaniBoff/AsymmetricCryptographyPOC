import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import authPassword from './app/middlewares/authPassword';

const { Router } = require('express');

const routes = new Router();

// Rota para a busca da public key para a encriptaçao
routes.get('/getPublicKey', UserController.getPublicKey);
// Rota de cadastro de usuario
routes.post('/users', UserController.store);
// Rota para criação do token de sessão
routes.post('/session', SessionController.login);
// Middleware responsável por validar o token de sessão
routes.use(authMiddleware);
// Busca usuário através de
routes.get('/users', UserController.index);
// Middleware responsável por validar o password
routes.use(authPassword);
// Rota para atualizar os dados do usuario
routes.put('/users', UserController.update);

export default routes;
