const Router = require('koa-router')
const router = new Router({prefix: '/zhihu/topics'})
const {find,findById,create,update} = require('../controllers/topics')




router.get('/', find)
router.post('/', create)
router.get('/:id', findById)
router.patch('/', update)

module.exports = router