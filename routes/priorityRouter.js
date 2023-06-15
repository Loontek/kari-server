const Router = require('express')
const router = new Router()
const priorityController = require('../controllers/priorityController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), priorityController.create)
router.get('/', priorityController.getAll)

module.exports = router