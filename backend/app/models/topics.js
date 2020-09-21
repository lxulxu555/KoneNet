const mongoose = require('mongoose')
const {Schema,model} = mongoose
const topicsSchema = new Schema({
    __v : {type:Number,select:false},
    name:{type:String,require:true},
    avatar_url : {type:String},
    introduction:{type:String,select: false}
})

module.exports = model('Topics',topicsSchema)