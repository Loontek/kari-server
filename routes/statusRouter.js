const Router = require('express')
const router = new Router()
const statusController = require('../controllers/statusController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), statusController.create)
router.get('/', statusController.getAll)

module.exports = router