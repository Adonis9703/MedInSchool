const router = require('koa-router')();
const {register, login, updateStudent} = require('../controller')

router
  .post('/hello', async ctx => {
    console.log(ctx.request.body)
    ctx.body = {
      ...ctx.request.body
    }
  })
  .post('/register', async ctx => {
    let temp = await register(ctx.request.body)
    if (temp) {
      ctx.body = {msg: '注册成功'}
    } else {
      ctx.body = {msg: '注册失败'}
    }
  })
  // .post('/login', async ctx => {
  //   //   let temp = await login(ctx.request.body)
  //   //   if (temp !== false) {
  //   //     console.log('===> 用户登录成功 <===')
  //   //     ctx.body = {msg: '登录成功'}
  //   //   } else {
  //   //     console.log('===> 用户登录失败 <===')
  //   //     ctx.body = {msg: '登录失败'}
  //   //   }
  //   // })
  .post('/login',login)
  .post('/studentUpdate', async ctx => {
    let temp = await updateStudent(ctx.request.body)
    if (temp) {
      ctx.body = {msg: '更新成功'}
    } else {
      ctx.body = {msg: '更新失败'}
    }
  })

module.exports = router
