const { hashSync, compareSync } = require("bcryptjs");
const User = require ("../models/userModel")

const catchAsyncErrors  = require("../middleware/catchAsyncError");
const ErrorHandler = require('../utils/errorHandler')



//register function
exports.signUp = catchAsyncErrors(async(req,res,next)=>{

    const { name, email, password } = req.body;

    if(!name && name.trim()==="" && !email && email.trim()==="" && !password && password.length()<6 ){
        res.status(422).json({
            message:"Invalid data" 
        })
    }

    const hashedPassword = hashSync(password)

    let user = new User({ email, name, password:hashedPassword });
    await user.save();

    if(!user){
        return next(new ErrorHandler("unexpected error",501)); 
    }

    res.status(201).json({
        success:true,
        message:"user created",
        user
    })
   
})


//login function
exports.login = catchAsyncErrors(async(req,res,next)=>{

    const {email, password} = req.body;

    if(!email && email.trim()==="" && !password && password.length()<6 ){
        return next(new ErrorHandler("Please enter email and password both",400)); 
    }

    let existingUser = await User.findOne({email});

    if(!existingUser){
        return next(new ErrorHandler("Invalid credentials",401));
    }

    const isPasswordCorrect = compareSync(password, existingUser.password);

    if(!isPasswordCorrect){
        return next(new ErrorHandler("Invalid credentials",401));
    }

    res.status(200).json({
        success:true,
        message:"user logged in",
        existingUser
    })
})


