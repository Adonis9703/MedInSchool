const Sequelize = require('sequelize')
const config = require('./config')

let sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
})

let student = sequelize.define('studentInfo', {
  studentId: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: Sequelize.STRING,
  idCard: Sequelize.STRING,
  sex: Sequelize.STRING,
  password: Sequelize.STRING,
  tel: Sequelize.STRING,
  bloodType: Sequelize.STRING,
  otherInfo: Sequelize.STRING,
  allergy: Sequelize.STRING
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = {student}
