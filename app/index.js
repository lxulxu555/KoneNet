const Koa = require('koa')
const koaBody = require('koa-body')
const routing = require('./routes')
const koaStatic = require('koa-static')
const mongoose = require('mongoose')
const parameter = require('koa-parameter')
const error = require('koa-json-error')
const path = require('path')
const {connectionStr,routerResponse} = require('./config')
const app = new Koa()

/*连接MongoDB数据库*/
mongoose.connect(
    connectionStr,
    {useUnifiedTopology: true, useNewUrlParser: true},
    () => console.log('MongoDB连接成功')
)
app.use(routerResponse())
app.use(error({
    postFormat : (e,{stack,...rest}) =>  rest
}))

app.use(koaStatic(path.join(__dirname,'../../image')))
app.use(koaBody({
    /*开启文件上传*/
    multipart:true,
    formidable:{
      //  uploadDir : path.join(__dirname,'public/uploads'),
          uploadDir : path.join(__dirname,'../../image'),
        /*保留扩展名*/
        keepExtensions:true
    }
}))

app.use(parameter(app))
routing(app)

/*后台启动的监听端口*/
app.listen(3000, () => console.log('程序已经启动在3000端口'))