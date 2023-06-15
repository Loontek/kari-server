const {PostInfo} = require('../models/models')
const ApiError = require('../error/ApiError')

class PostController {
  async create(req, res) {
    const {name} = req.body
    const post = await PostInfo.create({name})
    return res.json(post)
  }

  async getAll(req, res) {
    const posts = await PostInfo.findAll()
    return res.json(posts)
  }

  async getOne(req, res) {
    const {id} = req.params

    const post = await PostInfo.findOne({where:{id}})

    return res.json(post)
  }
}

module.exports = new PostController()