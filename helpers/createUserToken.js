require('dotenv').config()
const jwt = require('jsonwebtoken')
const { TOKEN } = process.env
const createUserToken = async (user, req, res) => {
  const token = jwt.sign(
    {
      id: user._id,
      name: user.username,
    },
    TOKEN,
  )

  return res
    .status(200)
    .json({ message: 'Você está autenticado.', token, userId: user._id })
}

module.exports = createUserToken
