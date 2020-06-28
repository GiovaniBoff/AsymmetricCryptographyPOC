import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const { Router } = require('express');

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

export default routes;
