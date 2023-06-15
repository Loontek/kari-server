const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const {Employee, User} = require('../models/models')

class EmployeeController {
  async create(req, res, next) {
    const {
      email,
      phoneNumber,
      name,
      surName,
      patronymic,
      password,
      birthDate,
      registrationDate,
      postId,
      role
    } = req.body

    const candidate = await Employee.findOne({where: {email}})
    if (candidate) {
      return next(ApiError.badRequest('Работник с таким email уже существует'))
    }

    const hashPassword = await bcrypt.hash(password, 5)

    const employee = await Employee.create({
      email,
      phoneNumber,
      name,
      surName,
      patronymic,
      birthDate,
      registrationDate,
      postId,
      role: 'EMPLOYEE',
      password: hashPassword
    })

    const user = await User.create({
      email,
      phoneNumber,
      name,
      surName,
      patronymic,
      role: 'EMPLOYEE',
      password: hashPassword
    })

    return res.json({employee})
  }

  async getAll(req, res, next) {
    const employees = await Employee.findAll()

    return res.json(employees)
  }

  async getOne(req, res) {
    const {email} = req.params

    const employee = await Employee.findOne({where: {email}})

    return res.json(employee)
  }
}

module.exports = new EmployeeController()