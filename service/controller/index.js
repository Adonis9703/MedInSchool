const {studentAdd, studentGet, studentUpdate} = require('../database/dao')

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
    ctx.body = {
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
const updateStudent = async data => {
  return await studentUpdate(data)
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
  register,
  login,
  updateStudent
}
