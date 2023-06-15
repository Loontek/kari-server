const Router = require('express')
const router = new Router()
const employeeController = require('../controllers/employeeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), employeeController.create)
router.get('/', employeeController.getAll)
router.get('/:email', employeeController.getOne)

module.exports = router