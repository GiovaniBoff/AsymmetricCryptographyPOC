import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import authRSA from './app/middlewares/authRSA';
import authPassword from './app/middlewares/authPassword';

const { Router } = require('express');

const routes = new Router();

// Rota de cadastro de usuario
routes.post('/users', UserController.store);
// Rota para criação do token de sessão
routes.post('/session', SessionController.store);
// Middleware responsável por validar o token de sessão
routes.use(authMiddleware);
routes.get('/users', UserController.index);
// Rota para a busca da public key para a encriptaçao
routes.get('/getPublicKey', UserController.getPublicKey);
// Middleware responsável por realizar a desincriptação
routes.use(authRSA);
// Middleware responsável por validar o password
routes.use(authPassword);
// Rota para atualizar os dados do usuario
routes.put('/users', UserController.update);

export default routes;
