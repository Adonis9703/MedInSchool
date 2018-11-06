const {user} = require('../database/entity')

const userAdd = function (data) {
  user.create({
    id: data.id,
    name: data.name,
    studentId: data.studentId,
    idCard: data.idCard,
    sex: data.sex,
    password: data.password
  }).then((u) => {
    console.log('DAO 注册信息录入数据库：\n', u.dataValues)
  })
};

const userGet = async (data) => {
  try {
    let temp = await user.findAll({where: {studentId: data.studentId}});
    console.log('===> 用户信息DAO <===\n', temp[0].dataValues)
    return temp[0].dataValues
  } catch (e) {
    console.log('===> 未查询到相关用户 <===\n', data)
    return false
  }
  // user.findAll({
  //   where: {
  //     id: data.id
  //   }
  // }).then(res => {
  //   return res[0].dataValues
  // }).catch(err => {
  //   console.log('===> 未查询到相关用户 <===\n ',data)
  //   return false
  // })
};

module.exports = {
  userAdd,
  userGet
};
