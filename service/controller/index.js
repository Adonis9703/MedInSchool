const {userAdd, userGet} = require('../database/dao')

const register = async function (data) {
  await userAdd(data)
}

const login = async function (data) {
  let user = await userGet(data)
  return user;
}

module.exports = {
  register,
  login
}
