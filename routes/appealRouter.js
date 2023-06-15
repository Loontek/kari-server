const Router = require('express')
const router = new Router()
const appealController = require('../controllers/appealController')

router.post('/', appealController.create)
router.patch('/', appealController.edit)
router.get('/', appealController.getAll)
router.get('/user-appeals/:id', appealController.getUserAll)
router.get('/:id', appealController.getOne)

module.exports = router