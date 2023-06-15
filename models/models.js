const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  surName: {type: DataTypes.STRING},
  patronymic: {type: DataTypes.STRING},
  phoneNumber: {type: DataTypes.STRING},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: 'USER'},
})

const Employee = sequelize.define('employee', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  surName: {type: DataTypes.STRING},
  patronymic: {type: DataTypes.STRING},
  phoneNumber: {type: DataTypes.STRING},
  email: {type: DataTypes.STRING, unique: true},
  birthDate: {type: DataTypes.DATE},
  password: {type: DataTypes.STRING},
  registrationDate: {type: DataTypes.DATE},
})

const Appeal = sequelize.define('appeal', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false},
  description: {type: DataTypes.STRING},
})

const StatusInfo = sequelize.define('status', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const PriorityInfo = sequelize.define('priority', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
  numericalVersion: {type: DataTypes.INTEGER, unique: true, allowNull: false},
})

const PostInfo = sequelize.define('post', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

User.hasMany(Appeal)
Appeal.belongsTo(User)

Employee.hasMany(Appeal)
Appeal.belongsTo(Employee)

// Appeal.hasOne(StatusInfo)
// StatusInfo.belongsTo(Appeal)
//
// Appeal.hasOne(PriorityInfo)
// PriorityInfo.belongsTo(Appeal)

// Employee.hasOne(PostInfo)
// PostInfo.belongsTo(Employee)

PostInfo.hasMany(Employee)
Employee.belongsTo(PostInfo)

StatusInfo.hasMany(Appeal)
Appeal.belongsTo(StatusInfo)

PriorityInfo.hasMany(Appeal)
Appeal.belongsTo(PriorityInfo)



module.exports = {
  User,
  Employee,
  Appeal,
  StatusInfo,
  PriorityInfo,
  PostInfo
}