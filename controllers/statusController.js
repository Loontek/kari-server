const {StatusInfo} = require('../models/models')
const ApiError = require('../error/ApiError')

class StatusController {
  async create(req, res) {
    const {name} = req.body
    const status = await StatusInfo.create({name})
    return res.json(status)
  }

  async getAll(req, res) {
    const statuses = await StatusInfo.findAll()
    return res.json(statuses)
  }
}

module.exports = new StatusController()