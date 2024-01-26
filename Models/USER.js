const mongoose=require('mongoose')
const mongoDB=require('mongodb')
const bcrypt=require('bcrypt')
const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    verified:{
        type:Boolean,
        default:false
    }
})
userSchema.pre("save",async function(next){
    const user=this
    if(!user.isModified('password')){
        return next()
    }
    user.password=await bcrypt.hash(user.password,8)
    next()
})

const User=mongoose.model('User',userSchema)
module.exports=User