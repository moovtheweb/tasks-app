const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name : {
        type: String,
        required: true

    },
    age : {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error("Age cannot be negative")
            }
        }
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")

            }
        }
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.pre('save', async function(next){
    const user = this

    //console.log(user.password)
    if(user.isModified('password')){

        const hashedPwd = await bcrypt.hash(user.password,8)
    
        //console.log(user.password + " => " + hashedPwd)
    
        user['password'] = hashedPwd

        // const isMatch = await bcrypt.compare('Red@1234',hashedPwd)
    
        // console.log(isMatch)
    }

    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User