const mongoose = require('mongoose')

const {Schema,model} = mongoose

const userSchema = new Schema({
    __v: {type: Number, require: true, select: false},
    password: {type: String, require: true, select: false},
    username: {type: String, require: true},
    email:{type:String,require:true},
    avatar_url: {type: String},
    gender: {type: String, enum: ['male', 'female']},
    headline:{type:String},
    introduce:{type:String},
    locations:{type:[{type:String}],select:false},
    business:{type:String,select:false},
    employments:{
        type : [{
            company : {type:String},
            job : {type:String}
        }],
        select:false
    },
    educations:{
        type :[{
            school : {type:String},
            major : {type:String},
            diploma:{type:String},
            entrance_time:{type:String},
            graduation_time:{type:String},
        }],
        select:false
    },
    following:{
        type : [{type : Schema.Types.ObjectId,ref:'User'}],
        select:false
    }
})


module.exports = model('User', userSchema)
