const router = require('koa-router')();
const {register, login, updateStudent, getSocketInfo} = require('../controller')

router
  .post('/hello', async ctx => {
    console.log(ctx.request.body)
    ctx.body = {
      ...ctx.request.body
    }
  })
  .post('/register', register)
  .post('/login',login)
  // .post('/studentUpdate', async ctx => {
  //   let temp = await updateStudent(ctx.request.body)
  //   if (temp) {
  //     ctx.body = {msg: '更新成功'}
  //   } else {
  //     ctx.body = {msg: '更新失败'}
  //   }
  // })
  .post('/studentUpdate', updateStudent)
  .post('/getSocketInfo', getSocketInfo)

module.exports = router
