const {socketInfo, user, chatInfo, medicine, msgHistory, rpInfo} = require('../database/entity')


const socketAdd = async (data) => {
  await socketInfo.create({...data}).then(res => {
    console.log('===> 新增 socket 信息成功 <===', res)
    return true
  }, err => {
    console.log('===> 新增 socket 信息失败 <===\n', err)
    return false
  })
};

const socketUpdate = async (data) => {
  await socketInfo.update({...data}, {where: {userId: data.userId}})//userId 可以是 studentId 或 doctorId
    .then(res => {
      console.log('===> 更新 socket 信息成功 <===', res)
      return true
    }, err => {
      console.log('===> 更新 socket 信息失败 <===')
      return false
    })
};

const socketGet = async (userId) => {
  try {
    let temp = await socketInfo.findById(userId)
    console.log('===> 查询 socket 信息 <=== \n', temp.dataValues)
    return temp.dataValues
  } catch (e) {
    console.log(e)
  }
  
}

module.exports = {
  socketAdd,
  socketUpdate,
  socketGet
};
