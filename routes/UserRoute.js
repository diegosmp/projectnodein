const router = require('express').Router()
const UserController = require('../controllers/UserController')
const verifyToken = require('../helpers/verifyToken')

router.post('/create', UserController.create)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.patch('/edit/:id', verifyToken, UserController.edit)

module.exports = router
