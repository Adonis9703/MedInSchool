const {student} = require('../database/entity')

const studentAdd = async function (data) {
  await student.create({...data}).then(res => {
    console.log('===> 新增用户成功 <===')
    return true
  }, err => {
    console.log('===> 新增用户失败 <===')
    return false
  })
};

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
  studentUpdate
};
