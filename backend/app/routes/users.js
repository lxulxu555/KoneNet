const Router = require('koa-router')
const jsonwebtoken = require('jsonwebtoken')
const {secret} = require('../config')
const router = new Router({prefix : '/zhihu/users'})
const {find,findById,create,update,delete : del,login,listFollowing,follow,email} = require('../controllers/users')


const auth = async (ctx,next) => {
    const {token = ''} = ctx.request.header
    const tk = token.replace('Bearer ',"")
    try {
        const user = jsonwebtoken.verify(tk,secret)
        ctx.state.id = user._id
    }catch (e) {
        ctx.throw(401,'token已失效')
    }
    await next()
}




router.get( '/',find)
router.post('/',create)
router.get('/:id',findById)
router.patch('/',auth,update)
router.delete('/:id',auth,del)
router.post('/login',login)
router.get('/:id/following',listFollowing)
router.put('/following',auth,follow)
router.post('/email',email)

module.exports = router