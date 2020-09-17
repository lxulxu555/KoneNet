const path = require('path')
class HomeCt1 {
    index(ctx){
        ctx.body = '<h1>这是主页</h1>'
    }

    upload(ctx){
        const file = ctx.request.files.file
        /*图片名称+拓展名*/
        const basename = path.basename(file.path)
        const url = `${ctx.origin}/uploads/${basename}`
        ctx.success(url)
    }
}

module.exports = new HomeCt1()