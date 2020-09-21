const Topic = require('../models/topics')

class TopicCt1{
    async find(ctx){
        const {page,rows = 10} = ctx.query
        const getPage = Math.max(page ,1) - 1
        const getRows = Math.max(rows,1)
        const data = await Topic.find().limit(getRows ).skip(getPage * getRows)
        ctx.success(data)
    }
    async findById(ctx){
        const topic = await Topic.findById(ctx.params.id).select('+introduction')
        ctx.success(topic)
    }
    async create(ctx){
        ctx.verifyParams({
            name:{type:'string',require:false},
            avatar_url:{type:'string',require:false},
            introduction:{type:'string',require:false},
        })
        const topic = await new Topic(ctx.request.body).save()
        ctx.success(topic,'创建成功')
    }
    async update(ctx){
        ctx.verifyParams({
            name:{type:'string',require:false},
            avatar_url:{type:'string',require:false},
            introduction:{type:'string',require:false},
        })
        await Topic.findByIdAndUpdate(ctx.request.body.id,ctx.request.body)
        ctx.success('','更新成功')
    }
}

module.exports = new TopicCt1()