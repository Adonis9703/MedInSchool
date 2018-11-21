const {student, socketInfo} = require('../database/entity')

const socketAdd = async (data) => {
  await socketInfo.create({...data}).then(res => {
    console.log('===> 新增 socket 信息成功 <===')
    return true
  }, err => {
    console.log('===> 新增 socket 信息失败 <===')
    return false
  })
};

const socketUpdate = async (data) => {
  await socketInfo.update({...data}, {where: {userId: data.userId}})//userId 可以是 studentId 或 doctorId
    .then(res => {
      console.log('===> 更新 socket 信息成功 <===')
      return true
    }, err => {
      console.log('===> 更新 socket 信息失败 <===')
      return false
    })
};

/**
 * 新增学生信息
 * @param data
 * @returns {Promise<void>}
 */
const studentAdd = async  (data) => {
  try {
    let temp = await student.create({...data})
    console.log('===> 新增用户失败 <===')
    return temp
  } catch (e) {
    console.log('===> 新增用户失败 <===')
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
    let temp = await student.findAll({where: {studentId: data.studentId}});
    console.log('===> 查询到该用户 <===\n', temp[0].dataValues)
    return temp[0].dataValues
  } catch (e) {
    console.log('===> 未查询到相关用户 <===\n')
    return false
  }
};
/**
 * 更新学生信息
 * @param data
 * @returns {Promise<boolean>}
 */
const studentUpdate = async (data) => {
  try {
    await studentGet(data)
    let temp = await student.update({...data.newInfo}, {where: {studentId: data.studentId}})
    return temp == 1
  } catch (e) {
    console.log('===> 更新用户失败 <===\n', e, data)
    return false
  }
}

module.exports = {
  studentAdd,
  studentGet,
  studentUpdate,
  socketAdd,
  socketUpdate
};
