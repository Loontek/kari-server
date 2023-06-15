const {PriorityInfo} = require('../models/models')
const ApiError = require('../error/ApiError')

class PriorityController {
  async create(req, res) {
    const {name, numericalVersion} = req.body
    const priority = await PriorityInfo.create({name, numericalVersion})
    return res.json(priority)
  }

  async getAll(req, res) {
    const priorities = await PriorityInfo.findAll()
    return res.json(priorities)
  }
}

module.exports = new PriorityController()