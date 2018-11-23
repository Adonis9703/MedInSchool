const Koa = require('koa');
const router = require('./router/index');
const bodyParser = require('koa-bodyparser');
const cros = require('koa2-cors');

const app = new Koa();
const http = require('http').createServer(app.callback());
const io = require('socket.io')(http);

const {socketUpdate, socketAdd} = require('./database/dao');

http.listen(3000);

app.use(cros({credentials: true}));
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods());

io.on('connection', socket => {
  console.log('service connected', socket.id);
  socket.on('send', data => {
    console.log('send from client', data)
    // io.sockets.emit('get', data)
    io.to(data.receiver).emit('get', data)
  })
  socket.on('login', async data => {
    await socketUpdate({userId: data.userId, socketId: socket.id, status: 'online'})
      .then(res => {
        console.log('socket id', socket.id)
        console.log('login', data)
      })
  })
  socket.on('register', async data => {
    console.log(data)
    await socketAdd({
      userId: data.userId, socketId: socket.id, status: 'offline'
    }).then(res => {
      console.log('注册socketId:' + socket.id + ' userId:' + data.userId)
    },err=> {
      console.log('注册socket失败',err)
    })
  })
});

console.log('service running on localhost:3000');
