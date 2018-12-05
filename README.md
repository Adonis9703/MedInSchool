# MedInSchool

浙科医务室 医生端+后台

现阶段 h5学生端，h5医生端

后期预计小程序化
## 技术栈

>前端：Vue，Vue-router，Vuex，Vue-cli，Axios，scss

>后端：Node.js，Koa2

>其他：Socket.io，MySql，sequelize.js (https://itbilu.com/nodejs/npm/VkYIaRPz-.html)

## 技术相关

> koa2 token 登录 http://www.cnblogs.com/linxin/p/9491342.html  

### 前后端使用Socket.io实时通信

#### Vue中使用Socket.io

>npm install vue-socket.io socket.io-client --save

- 首先在main.js中引入
```
import VueSocketIo from 'vue-socket.io'
import socketIo from 'socket.io-client'

Vue.use(VueSocketIo, socketIo('http://localhost:3000'))//服务器地址
```
- 在Vue组件中使用(示例)
```
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
```
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

#### 通过Socket.io 实现私聊

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

在每次用户上线时，更新映射表中的数据，例如：
```
socket.on('login', async userId => {
    awawit someMethod(userId, socket.id)
})
```
原型上体现：当用户选择一个医生后，获取该医生id，到映射表中拿到相对应的socket id，通过io.to(socketId).emit()实现私聊
```
io.to(socket.id).emit('message','surprise'); 
```
https://blog.csdn.net/koastal/article/details/53677766


### 数据库设计

- studnetInfo 学生信息表

  ```
  姓名，学号，身份证号，性别，密码，电话，血型，敏感，备注

  name, studentId(key), idCard, sex, password, tel, bloodType, allergy, otherInfo
  ```
- doctorInfo 医生信息表

  姓名，工号，密码，电话，科室

  name, doctorId(key), password, tel, department

- socketInfo 用户-socketId 映射表
  > 存放用户id和socket连接关系的表，可用于私聊、判断用户在线状态等

  ```
  用户id(学号或工号)，socketId，在线标记

  userId, socketId, status  
  ```
- chatHistory 聊天记录表
  ```
  chatId(自增key)，发送者id，接收者id，消息内容，消息时间
  
  chatId, senderId, receiverId, msgConent, msgTiming
  ```
  
- requestInfo 问诊请求表

  ```
  问诊编号，学号，工号，主诉，问诊状态（待接诊，问诊中，已结束），处方id
    
  requestId(key), studentId, doctorId, requestText, requestImages, 
  ```

- prescriptionInfo 处方笺表

  ```
  处方id，问诊编号，医生姓名，科室，学生姓名，学生年龄，学生性别，学生主诉，
  诊断，开具日期，药品详情，药品费用，问诊费用，其他费用，合计费用
  
  prescriptionId, requestId, doctorName, studentName, age, sex, requestText, diagnosis, 
  date, Medicines, MedPrice, askPrice, otherPrice, totalPrice
  
  *药品详情 以JSON字符串的形式储存
  ```
 
- medicineInfo 药品库表
  ```
  药品id，药品名，规格，单价，库存，修改时间
  
  medicineId, medName, medSpecifications, price, count, updateTiming
  ```
