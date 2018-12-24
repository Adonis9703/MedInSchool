const {user} = require('../database/entity')
const jwt = require('jsonwebtoken')

const register = async (ctx) => {
  await user.create(ctx.request.body).then(res => {
    console.log('controller', res.dataValues)
    ctx.body = 'success'
  })
}

const login = async (ctx) => {
  await user.findById(ctx.request.body.userId).then(res => {
    console.log('controller', res.dataValues)
    if (res.dataValues.password === ctx.request.body.password) {
      ctx.body = 'success'
    } else {
      ctx.body = 'fail'
    }
  })
}

module.exports = {
  register,
  login
}
