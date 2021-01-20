const Router = require('koa-router');

const authrouter = new Router();

const {
  login,
  success
} = require('../controller/auth.controller');
const {
  verifyLogin,
  verifyAuth
} = require('../middleware/auth.middleware');

authrouter.post('/login', verifyLogin, login);
authrouter.get('/test', verifyAuth, success);

module.exports = authrouter;