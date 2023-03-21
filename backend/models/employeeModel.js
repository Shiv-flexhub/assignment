const mongoose = require("mongoose")


const employeeScheme = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"PLease enter your name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[4,"Name should have more than 4 characters"]
    },

    address:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    }
})



const Employee = new mongoose.model("Employee", employeeScheme);

module.exports = Employee