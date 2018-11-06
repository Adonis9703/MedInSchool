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

module.exports = {
  register,
  login
}
