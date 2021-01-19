const Router = require('koa-router');

const authrouter = new Router();

const {
  login
} = require('../controller/auth.controller');
const {
  verifyLogin
} = require('../middleware/auth.middleware');

authrouter.post('/login', verifyLogin, login);

module.exports = authrouter;