const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
// 路由相关
// const userRouter = require('../router/user.router');
// const authRouter = require('../router/auth.router');
const useRoutes = require('../router/index');
const errorHandle = require('./error-handle');
const app = new Koa();

app.use(bodyParser());
app.use(cors());
useRoutes(app);
// app.use(userRouter.routes());
// app.use(authRouter.routes());
// app.use(userRouter.allowedMethods());
// app.use(authRouter.allowedMethods());

app.on('error', errorHandle);

module.exports = app;