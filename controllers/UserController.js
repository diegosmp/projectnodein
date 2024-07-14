require('dotenv').config()
const createUserToken = require('../helpers/createUserToken')
const getToken = require('../helpers/getToken')
const Users = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { TOKEN } = process.env

module.exports = class UserController {
  static async create(req, res) {
    const { name, username, password, confirmPass } = req.body
    if (!name) {
      return res.status(422).json({ message: 'O campo nome é obrigatório!' })
    }
    if (!username) {
      return res.status(422).json({ message: 'O campo usuário é obrigatório!' })
    }
    if (!password) {
      return res.status(422).json({ message: 'O campo senha é obrigatório!' })
    }
    if (!confirmPass) {
      return res
        .status(422)
        .json({ message: 'O campo confirmação de senha é obrigatório!' })
    }

    if (confirmPass !== password) {
      return res.status(422).json({ message: 'A senhas não são iguais!' })
    }

    const existUser = await Users.findOne({ where: { username } })
    if (existUser) {
      return res.status(401).json({ message: 'Usuário já cadastrado!' })
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    try {
      const newUser = await Users.create({
        name,
        username,
        password: passwordHash,
      })

      await createUserToken(newUser, req, res)
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .json({ message: 'Erro ao conectar com o servidor!' })
    }
  }

  static async login(req, res) {
    const { username, password } = req.body

    if (!username) {
      return res.status(422).json({ message: 'O campo usuário é obrigatório!' })
    }
    if (!password) {
      return res.status(422).json({ message: 'O campo senha é obrigatório!' })
    }
    const user = await Users.findOne({ where: { username } })
    if (!user) {
      return res.status(404).json({ message: 'Usuário ou senha incorreta!' })
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      return res.status(422).json({ message: 'Usuário ou senha incorreta!' })
    }

    await createUserToken(user, req, res)
  }

  static async checkUser(req, res) {
    let currentUser

    if (req.headers.authorization) {
      const token = getToken(req)
      const decoded = jwt.verify(token, TOKEN)
      currentUser = await Users.findByPk(decoded.id)
      currentUser.password = undefined
    } else {
      currentUser = null
    }

    res.status(200).json(currentUser)
  }

  static async edit(req, res) {
    return res.status(200).json({ message: 'Rota update deu certo!' })
  }
}
