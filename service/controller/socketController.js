const {
  socketAdd,
  socketUpdate,
  socketGet
} = require('../database/dao')

const getSocketInfo = async (ctx) => {
  let temp = await socketGet(ctx.request.body.userId)
  if (temp) {
    ctx.body = {
      socketInfo: temp
    }
  }
}

const updateSocket = async (data, socketId) => {
  console.log(`测试`, data, socketId)
}

module.exports = {
  updateSocket
}

