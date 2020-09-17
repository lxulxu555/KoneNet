function routerResponse(option={}){
    return async function(ctx,next){
        ctx.success = function (data,msg) {
            ctx.type = option.type || 'json'
            ctx.body = {
                code : option.successCode || 0,
                msg : msg,
                data : data
            }
        }

        ctx.fail = function (msg) {
            ctx.type = option.type || 'json'
            ctx.body = {
                code : -1,
                msg : msg || option.successMsg || 'fail',
            }
            console.log(ctx.body)
        }

       await next()
    }

}

module.exports = {
    secret:'zhihu-jwt-secret',
    connectionStr : 'mongodb+srv://lxulxu555:Alxu72407232@zhihu.hcap2.mongodb.net/test?retryWrites=true&w=majority',
    routerResponse
}