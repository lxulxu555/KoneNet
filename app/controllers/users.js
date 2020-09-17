const jsonwebtoken = require("jsonwebtoken")
const User = require('../models/users')
const {secret} = require('../config')
const nodemailer = require('../nodemailer')
const redisHelper = require('../redis')
var time = ''
var Initcode = ''

class Users {
    async find(ctx) {
        ctx.success(await User.find())
    }

    async findById(ctx) {
        ctx.verifyParams({
            id: {type: 'string', required: true}
        })
        const user = await User.findById(ctx.params.id).select('+educations +employments +business +locations')
        if (!user) {
            ctx.fail('用户不存在')
        } else {
            ctx.success(user)
        }
    }

    async create(ctx) {
        ctx.verifyParams({
            username: {type: 'string', required: true},
            password: {type: 'string', required: true},
            code: {type: 'string', required: true},
            email: {type: 'string', required: true}
        })
        const {username, code, password, email} = ctx.request.body
        const repeatedUser = await User.findOne({username})
        if (repeatedUser) {
            ctx.fail('账户名已经存在')
        } else {
           const result = await redisHelper.getString(email)
            if(result === code){
                await User(ctx.request.body).save()
                ctx.success('', '注册成功')
            }else{
                ctx.fail('请输入正确验证码')
            }
        }
    }

    async email(ctx) {
        ctx.verifyParams({
            email: {type: 'string', required: true},
            username: {type: 'string', required: true},
        })
        const user = ctx.request.body
        const code = parseInt(Math.random(0, 1) * 10000) //生成随机验证码
        const judgeEmail = await User.findOne({email: user.email})
        if (judgeEmail) {
            ctx.fail('该邮箱已经注册')
        } else {
            const key = user.email
            const result = await redisHelper.setString(key, code, 60 * 5)
            if(result === 'OK'){
                nodemailer(user, code)
                ctx.success('', '已发送')
            }
        }
    }


    async update(ctx) {
        ctx.verifyParams({
            username: {type: 'string', required: false},
            password: {type: 'string', required: false},
            avatar_url: {type: 'string', required: false},
            gender: {type: 'string', required: false},
            headline: {type: 'string', required: false},
            locations: {type: 'array', itemType: 'string', required: false},
            business: {type: 'string', required: false},
            employments: {type: 'array', itemType: 'object', required: false},
            educations: {type: 'array', itemType: 'object', required: false},
        })
        const {id} = ctx.state
        const user = await User.findByIdAndUpdate(id, ctx.request.body)
        if (!user) {
            ctx.fail('没有该用户')
        } else {
            ctx.success('','更新成功')
        }
    }

    async delete(ctx) {
        ctx.verifyParams({
            id: {type: 'string', required: true}
        })
        const user = await User.findByIdAndRemove(ctx.params.id)
        if (!user) {
            ctx.fail('没有该用户')
        } else {
            ctx.success('', '删除成功')
        }
    }

    async login(ctx) {
        ctx.verifyParams({
            username: {type: 'string', required: false},
            password: {type: 'string', required: false}
        })
        const user = await User.findOne(ctx.request.body).select('+educations +employments +business +locations')
        if (!user) {
            ctx.fail('账号或者密码错误')
        } else {
            const {_id, username} = user
            const token = jsonwebtoken.sign({_id, username}, secret, {expiresIn: '1d'})
            ctx.success({token, user}, '登陆成功')
        }
    }

    async listFollowing(ctx) {
        const user = await User.findById(ctx.params.id).select('+following').populate('following')
        if (!user) {
            ctx.fail('用户不存在')
        } else {
            ctx.success(user.following)
        }
    }

    async follow(ctx) {
        ctx.verifyParams({
            id: {type: 'string', required: true},
        })
        const me = await User.findById(ctx.state.id).select('+following')
        if (!me.following.map(id => id.toString()).includes(ctx.request.body.id)) {
            me.following.push(ctx.params.id)
            me.save()
            ctx.success('', '关注成功')
        } else {
            ctx.fail('不可重复关注')
        }
    }
}

module.exports = new Users()