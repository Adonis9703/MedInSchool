const router = require('koa-router')();
const {register, login} = require('../controller')

router
  .post('/hello', async ctx => {
    console.log(ctx.request.body)
    ctx.body = {
      ...ctx.request.body
    }
  })
  .post('/register', async ctx => {
    await register(ctx.request.body)
    ctx.body = {code: 200, msg: '注册成功'}
  })
  .post('/login', async ctx => {
    let temp = await login(ctx.request.body)
    if (temp !== false) {
      console.log('===> 用户登录成功 <===')
      ctx.body = {msg: '登录成功'}
    } else {
      console.log('===> 用户登录失败 <===')
      ctx.body = {msg: '登录失败'}
    }
  })

module.exports = router
