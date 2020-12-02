import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import authRSA from './app/middlewares/authRSA';
import authPassword from './app/middlewares/authPassword';

const { Router } = require('express');

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);
routes.get('/getPublicKey', UserController.getPublicKey);
routes.use(authRSA);
routes.post('/teste', UserController.index);
routes.use(authPassword);
routes.put('/users', UserController.update);

export default routes;
