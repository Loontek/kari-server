const {Appeal, User} = require('../models/models')
const ApiError = require('../error/ApiError')
const bcrypt = require("bcrypt");

class AppealController {
  async create(req, res) {
    const {title, description, userId} = req.body

    const appeal = await Appeal.create({
      title,
      description,
      userId,
      statusId: 1,
      priorityId: 1
    })

    return res.json(appeal)
  }

  async edit(req,res) {
    const {id, statusId, priorityId, employeeId} = req.body

    const appeal = await Appeal.findOne({where:{id}})

    const newAppeal = await Appeal.update({
      employeeId: employeeId ? employeeId : appeal.dataValues.employeeId,
      statusId: statusId ? statusId : appeal.dataValues.statusId,
      priorityId: priorityId ? priorityId : appeal.dataValues.priorityId
    },{where: {id}})

    return res.json(newAppeal)
  }

  async getAll(req, res) {
    const appeals = await Appeal.findAll()

    return res.json(appeals)
  }

  async getUserAll(req, res) {
    const {id} = req.params

    const appeals = await Appeal.findAll({where: {id}})

    return res.json(appeals)
  }
  async getOne(req, res, next) {
    const {id} = req.params
    const appeal = await Appeal.findOne({where:{id}})

    if(!appeal) {
      return next(ApiError.badRequest('Обращения с таким id не существует'))
    }

    return res.json(appeal)
  }
}

module.exports = new AppealController()