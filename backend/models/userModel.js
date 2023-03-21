const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"PLease enter your name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[4,"Name should have more than 4 characters"]
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
})

//generate jwt token
userSchema.methods.getJWTToken = function(){
   
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}


const User = new mongoose.model("User", userSchema);

module.exports = User