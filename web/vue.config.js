module.exports = {
    devServer:{
        proxy:{
            '/api':{
                target:'http://182.92.218.236/zhihu',
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}
