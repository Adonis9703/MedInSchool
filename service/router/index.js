const router = require('koa-router')();
const {register, login, updateStudent, getSocketInfo, checkToken} = require('../controller')

router
  .post('/hello', async ctx => {
    console.log(ctx.request.body)
    ctx.body = {
      ...ctx.request.body
    }
  })
  .post('/register', register)
  .post('/login',login)
  .post('/studentUpdate', updateStudent)
  .post('/getSocketInfo', getSocketInfo)
  .post('/checkToken', checkToken)

module.exports = router
