const {userAdd, userGet} = require('../database/dao')

//注册
const register = async (data) => {
  await userAdd(data)
}
//登录
const login = async (data) => {
  let user = await userGet(data)
  if (user === false) {
    return false
  } else {
    return data.password === user.password;
  }
  // return user;
}
//todo 所有用户
//todo 点对点聊天
//todo 修改密码

//todo 学生端
//todo 查询在线医生列表
//todo 接收处方
//todo 查询附近药房、药店

//todo 医生端
//todo 开方
//todo 生成处方单

module.exports = {
  register,
  login
}
