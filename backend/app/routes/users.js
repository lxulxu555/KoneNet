const Router = require('koa-router')
const jsonwebtoken = require('jsonwebtoken')
const {secret} = require('../config')
const router = new Router({prefix: '/zhihu/users'})
const {find, findById, create, update, delete: del, login, listFollowing, follow, email, listFollowers,checkUserExist} = require('../controllers/users')


const auth = async (ctx, next) => {
    const {token = ''} = ctx.request.header
    const tk = token.replace('Bearer ', "")
    try {
        const user = jsonwebtoken.verify(tk, secret)
        ctx.state.id = user._id
    } catch (e) {
        ctx.throw(401, 'token已失效')
    }
    await next()
}


router.get('/', find)
router.post('/', create)
router.get('/:id', findById)
router.patch('/', auth, update)
router.delete('/:id', auth, del)
router.post('/login', login)
router.get('/following/:id', listFollowing)
router.post('/following', auth, checkUserExist,follow)
router.delete('/following/:id', auth, checkUserExist,follow)
router.post('/email', email)
router.get('/followers/:id', listFollowers)

module.exports = router