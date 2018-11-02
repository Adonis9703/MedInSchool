const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const cros  = require('koa2-cors');

const app = new Koa();
const http = require('http').createServer(app.callback());
const io = require('socket.io')(http);

http.listen(3000);

router.get('/', async (ctx) => {
  ctx.body = 'hello service'
});

app.use(router.routes());
//app.use(cros())

io.on('connection', socket => {
  console.log('service connected');
  socket.on('test', data => {
    console.log('test connected')
  })
});

console.log('service running on localhost:3000');
