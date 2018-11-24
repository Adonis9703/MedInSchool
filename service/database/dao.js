const {student, socketInfo} = require('../database/entity')

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
/**
 * 新增学生信息
 * @param data
 * @returns {Promise<void>}
 */
const studentAdd = async (data) => {
  try {
    let temp = await student.create({...data})
    console.log('===> 新增用户成功 <===', data)
    return temp
  } catch (e) {
    console.log('===> 新增用户失败 <===', e)
    return false
  }
  // await student.create({...data}).then(res => {
  //   console.log('===> 新增用户成功 <===')
  //   return true
  // }, err => {
  //   console.log('===> 新增用户失败 <===')
  //   return false
  // })
};
/**
 * 查询学生信息
 * @param data
 * @returns {Promise<*>}
 */
const studentGet = async (data) => {
  try {
    let temp = await student.findById(data.studentId);
    console.log('===> 查询到该用户 <===\n', temp.dataValues)
    return temp.dataValues
  } catch (e) {
    console.log('===> 未查询到相关用户 <===\n', e)
    return false
  }
};
/**
 * 更新学生信息
 * @param data
 * @returns {Promise<boolean>}
 */
const studentUpdate = async (data) => {
  await studentGet(data).then(res => {
    console.log('get', res)
  })
  let temp = await student.update({...data.newInfo}, {where: {studentId: data.studentId}})
  console.log('temp', temp[0], temp[1])
  return temp == 1
}

module.exports = {
  studentAdd,
  studentGet,
  studentUpdate,
  socketAdd,
  socketUpdate,
  socketGet
};
