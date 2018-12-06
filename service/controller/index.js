const {
  studentAdd,
  studentGet,
  studentUpdate,
  socketAdd,
  socketUpdate,
  socketGet
} = require('../database/dao')
const jwt = require('jsonwebtoken');


//注册
const register = async (ctx) => {
  let user = await studentAdd(ctx.request.body)
  if (user) {
    ctx.body = {msg: '注册成功'}
  } else {
    ctx.body = {msg: '注册失败'}
  }
}
//登录
const login = async (ctx) => {
  let user = await studentGet(ctx.request.body)
  if (user.password === ctx.request.body.password) {
    const token = jwt.sign({
      name: user.name
    }, 'secret', {expiresIn: '2h'}); //sign(第一个参数载荷，第二参数密钥，第三个参数配置参数)
    ctx.body = {
      token: token,
      msg: '登录成功'
    }
  } else {
    ctx.body = {
      msg: '登录失败'
    }
  }
  // return user;
}
//修改用户信息
const updateStudent = async (ctx) => {
  let temp = await studentUpdate(ctx.request.body)
  if (temp) {
    ctx.body = {msg: '更新成功'}
  } else {
    ctx.body = {msg: '更新失败'}
  }
}

const checkToken = ctx => {
  let token = ctx.request.header.token
  console.log('客户端携带的token====>', token)
  jwt.verify(token, 'secret', (err, decode) => {
    console.log(`验证token`, err, decode)
    if (err) {
      ctx.body = {
        message: 'token验证失败'
      }
    } else {
      ctx.body = {message: 'token验证通过'}
    }
  })
}

const getSocketInfo = async (ctx) => {
  let temp = await socketGet(ctx.request.body.userId)
  if (temp) {
    ctx.body = {
      socketInfo: temp
    }
  }
}
//todo 所有用户
//todo 点对点聊天
//todo 修改个人信息

//todo 学生端
//todo 查询在线医生列表
//todo 接收处方
//todo 查询附近药房、药店

//todo 医生端
//todo 开方
//todo 生成处方单

module.exports = {
  checkToken,
  register,
  login,
  updateStudent,
  getSocketInfo
}
