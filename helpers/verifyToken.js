require('dotenv').config()
const jwt = require('jsonwebtoken')
const getToken = require('./getToken')
const { TOKEN } = process.env
const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(422).json({ message: 'Acesso negado!' })
  }

  const token = getToken(req)
  console.log(token)
  if (!token) {
    return res.status(201).json({ message: 'Acesso negado!' })
  }

  try {
    const verified = jwt.verify(token, TOKEN)
    req.user = verified
    next()
  } catch (error) {
    return res.status(400).json({ message: 'Token inválido!' })
  }
}

module.exports = verifyToken
