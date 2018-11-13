# MedInSchool

浙科医务室 医生端+后台

现阶段 h5学生端，h5医生端

后期预计小程序化
## 技术栈

>前端：Vue，Vue-router，Vuex，Vue-cli，Axios，scss

>后端：Node.js，Koa2

>其他：Socket.io，MySql

## 技术相关

### 前后端使用Socket.io实时通信

#### Vue中使用Socket.io

>npm install vue-socket.io socket.io-client --save

- 首先在main.js中引入
```$xslt
import VueSocketIo from 'vue-socket.io'
import socketIo from 'socket.io-client'

Vue.use(VueSocketIo, socketIo('http://localhost:3000'))//服务器地址
```
- 在Vue组件中使用(示例)
```$xslt
sockets: {
    connect(){
        console.log('connected successfully')
    }
},
methods: {
    sendMessage(msg) {
        this.$socket.emit('test', msg)  //向后台发送名为test 的消息
    }
}
```
#### Node中使用Socket.io

> npm install socket.io --save

- 在app.js中引入(以Koa为例)
```$xslt
const Koa = require('koa')
const app = new Koa()
const http = require('http').createServer(app.callback())
const io = reuire('socket.io')(http)

http.listen(3000)

io.on('connection', (socket) => {
    console.log('connect success')
    socket.on('test', (data) => {   //此处的test与前端emit中的相对应
        console.log('messge => ' + data)
    })
})
```

- 通过Socket.io 实现私聊

>每次客户端和服务器通过socket连接时，都会产生一个socket对象

获取该socket对象的唯一id，例如：
```
io.on('connection', socket => {
    console.log('socket id', socket.id)
    socket.on('disconnect', () => {
        console.log('disconenct', socket.id)
    })
})
```
>我们可以在数据库中维护一个socket.id和用户id的映射表

https://blog.csdn.net/koastal/article/details/53677766

客户端的用户名

### 普通用户

姓名，学号，性别，出生年月

### 医务人员

姓名，工号，性别，科室

### 处方单

id，时间戳，患者信息，医生信息，价格，病情描述，药品内容

