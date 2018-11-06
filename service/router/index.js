const router = require('koa-router')();

router.get('/', async ctx => {
  ctx.body = 'connected'
});

router.post('/hello', async ctx => {
  ctx.body = 'hello service'
})

module.exports = router
