const jsonwebtoken = require("jsonwebtoken")
const User = require('../models/users')
const {secret} = require('../config')
const nodemailer = require('../nodemailer')
const redisHelper = require('../redis')

class Users {

    //查询所有用户
    async find(ctx) {
        const {page,rows = 10} = ctx.query
        const getPage = Math.max(page ,1) - 1
        const getRows = Math.max(rows,1)
        const data = await User.find().limit(getRows ).skip(getPage * getRows)
        ctx.success(data)
    }

    //根据用户ID查询用户详情
    async findById(ctx) {
        ctx.verifyParams({
            id: {type: 'string', required: true}
        })
        const user = await User.findById(ctx.params.id).
        select('+educations +employments +business +locations +following +introduce').populate('following')
        if (!user) {
            ctx.fail('用户不存在')
        } else {
            ctx.success(user)
        }
    }

    //注册账户
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
            if (result === code) {
                await User(ctx.request.body).save()
                ctx.success('', '注册成功')
            } else {
                ctx.fail('请输入正确验证码')
            }
        }
    }

    //给邮箱发送验证码
    async email(ctx) {
        ctx.verifyParams({
            email: {type: 'string', required: true},
        })
        const {email} = ctx.request.body
        const code = parseInt(Math.random(0, 1) * 10000) //生成随机验证码
        const judgeEmail = await User.findOne({email})
        if (judgeEmail) {
            ctx.fail('该邮箱已经注册')
        } else {
            const result = await redisHelper.setString(email, code, 60 * 5)
            if (result === 'OK') {
                nodemailer(email, code)
                ctx.success('', '已发送')
            }
        }
    }

    //更新用户
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
            ctx.success('', '更新成功')
        }
    }

    //删除用户
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

    //登录
    async login(ctx) {
        ctx.verifyParams({
            username: {type: 'string', required: false},
            password: {type: 'string', required: false}
        })
        const user = await User.findOne(ctx.request.body)
            .select('+educations +employments +business +locations +following +introduce').populate('following')
        if (!user) {
            ctx.fail('账号或者密码错误')
        } else {
            const {_id, username} = user
            const token = jsonwebtoken.sign({_id, username}, secret, {expiresIn: '1d'})
            ctx.success({token, user}, '登陆成功')
        }
    }

    //用户关注或取消关注时，校验当前id是否存在
    async checkUserExist(ctx, next) {
        const {method} = ctx
        const id = method === 'POST' ? ctx.request.body.id : ctx.params.id
        const user = await User.findById(id)
        if (!user) {
            ctx.fail('用户不存在')
        } else {
            await next()
        }
    }

    //某人的关注列表
    async listFollowing(ctx) {
        const user = await User.findById(ctx.params.id).populate('following')
        if (!user) {
            ctx.fail('用户不存在')
        } else {
            ctx.success(user.following)
        }
    }

    //关注某人
    async follow(ctx) {
        ctx.verifyParams({
            id: {type: 'string', required: true},
        })
        const {method, state, request, params} = ctx
        //查询自己的关注列表
        const me = await User.findById(state.id).select('+following')
        if (method === 'POST') {
            const {id} = request.body
            if (!me.following.map(itemId => itemId.toString()).includes(id)) {
                me.following.push(id)
                me.save()
                ctx.success('', '关注成功')
            } else {
                ctx.fail('不可重复关注')
            }
        } else {
            const index = me.following.map(item => item.toString()).indexOf(params.id)
            if (index > -1) {
                me.following.splice(index, 1)
                me.save()
                ctx.success('', '取消关注成功')
            } else {
                ctx.fail('没有关注该用户')
            }
        }
    }

    //某人的粉丝列表
    async listFollowers(ctx) {
        const users = await User.find({following: ctx.params.id})
        ctx.success(users)
    }
}

module.exports = new Users()