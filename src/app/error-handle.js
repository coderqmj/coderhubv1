const errorTypes = require('../constants/error-types');

const errorHandle = (error, ctx) => {
  let status, message;

  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400; // Bad Request
      message = "用户名密码不能为空~"
      break;
    case errorTypes.NAME_ALREAD_EXISTS:
      status = 409; // Bad Request
      message = "用户已经存在~"
      break;
    default:
      status = 404;
      message = "NOT FOUND~";
      break;
  }

  console.log(error.message);

  ctx.status = status;
  ctx.body = message;
};

module.exports = errorHandle;