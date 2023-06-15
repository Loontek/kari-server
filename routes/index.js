const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const employeeRouter = require('./employeeRouter')
const appealRouter = require('./appealRouter')
const statusRouter = require('./statusRouter')
const priorityRouter = require('./priorityRouter')
const postRouter = require('./postRouter')

router.use('/user', userRouter)
router.use('/employee', employeeRouter)
router.use('/appeal', appealRouter)
router.use('/status', statusRouter)
router.use('/priority', priorityRouter)
router.use('/post', postRouter)

module.exports = router