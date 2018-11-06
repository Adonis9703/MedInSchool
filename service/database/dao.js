const {user} = require('../database/entity')

const userAdd = function (data) {
  user.create({
    id: data.id,
    name: data.name,
    studentId: data.studentId,
    idCard: data.idCard,
    sex: data.sex
  }).then((u) => {
    console.log('DAO 注册信息录入数据库：\n', u.dataValues)
  })
};

const userGet = async (data) => {
  try {
    let temp = await user.findAll({
      where: {
        id: data.id
      }
    });
    console.log('DAO 查询用户信息：\n', temp[0].dataValues)
    return temp[0].dataValues
  } catch (e) {
    console.log('数据库查询错误', e)
    return false
  }
};

module.exports = {
  userAdd,
  userGet
};
