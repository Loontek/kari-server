const ApiError = require("../error/ApiError");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require("../models/models");

const generateJwt = (id, email, password, role
) => {
  return jwt.sign(
    {id, email, password, role},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}

class UserController {
  async registration(req, res, next) {
    const {email, phoneNumber, name, surName, patronymic, password, role} = req.body

    if(!email || !password) {
      return next(ApiError.badRequest('Некоректный email или password'))
    }

    const candidate = await User.findOne({where: {email}})
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'))
    }

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({
      email,
      phoneNumber,
      name,
      surName,
      patronymic,
      role,
      password: hashPassword
    })

    const token = generateJwt(
      user.id,
      user.email,
      user.password,
      user.role
    )

    return res.json({token})
  }

  async login(req, res, next) {
    const {email, password} = req.body
    const user = await User.findOne({where: {email}})

    if(!user) {
      return next(ApiError.internal('Пользователь не найден'))
    }

    let comparePassword = bcrypt.compareSync(password, user.password)

    if(!comparePassword) {
      return next(ApiError.internal('Указан не верный пароль'))
    }

    const token = generateJwt(
      user.id,
      user.email,
      user.password,
      user.role
    )

    return res.json({token})
  }

  async check(req, res, next) {
    const token = generateJwt(
      req.user.id,
      req.user.email,
      req.user.password,
      req.user.role
    )
    return res.json({token})
  }

  async getAll(req, res) {
    const users = await User.findAll();

    return res.json(users)
  }

  async getUsers(req, res) {
    const users = await User.findAll({where: {role: 'USER'}})

    return res.json(users)
  }

  async getOne(req, res, next) {
    const {id} = req.params
    const user = await User.findOne({where:{id}})

    if(!user) {
      return next(ApiError.badRequest('Пользователя с таким id не существует'))
    }

    return res.json(user)
  }
}

module.exports = new UserController()