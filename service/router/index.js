const router = require('koa-router')();
// const {register, login, updateStudent, getSocketInfo, checkToken} = require('../controller')
const {findRpById, addRp, updateRp} = require('../database/dao/rpDAO')
const {register, login} = require('../controller/userController')
router
  .post('/hello', async ctx => {
    console.log(ctx.request.body)
    ctx.body = {
      ...ctx.request.body
    }
  })
  // .post('/register', register)
  // .post('/login', login)
  // .post('/studentUpdate', updateStudent)
  // .post('/getSocketInfo', getSocketInfo)
  // .post('/checkToken', checkToken)
  .post('/register', register)
  .post('/login', login)
  .post('/test', async (ctx) => {
    console.log(ctx.request.body)
    await addRp(ctx.request.body)
    ctx.body = 'success'
  })

module.exports = router
