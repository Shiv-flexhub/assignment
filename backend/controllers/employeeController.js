const catchAsyncError = require("../middleware/catchAsyncError")
const Employee = require("../models/employeeModel")
const ErrorHandler = require('../utils/errorHandler')

//add a new employee
exports.addEmployee = catchAsyncError(async(req,res,next)=>{

    const employee = await Employee.create(req.body);

    res.status(201).json({
        success:true,
        employee})

});

//update employee's detail
exports.updateEmployee = catchAsyncError(async(req,res,next)=>{

    const newEmployeeData = {
        name:req.body.name,
        department:req.body.department,
        status:req.body.status,
        age:req.body.age,
        address:req.body.address
    }

    const employee = await Employee.findByIdAndUpdate(req.params.id,newEmployeeData,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success:true,
        message:"Changes are updated",
        employee
    })



});

//get a employee
exports.getEmployee = catchAsyncError(async(req,res,next)=>{
    const id = req.params.id;

    const employee = await Employee.findById(id);

     if(!employee){
        return next(new ErrorHandler("no employee found with this id",404));
     }

     res.status(200).json({
        success:true,
        employee
    })

});

//get all the employees
exports.getAllEmployees = catchAsyncError(async(req,res,next)=>{

    const employees = await Employee.find();

    if(!employees){
        return next(new ErrorHandler("no employees found",404));
    }

    res.status(200).json({
        success:true,
        employees
    })

});

//delete an employee
exports.deleteEmployee = catchAsyncError(async(req,res,next)=>{

    const employee = await Employee.findById(req.params.id);

    if(!employee){
        return next(new ErrorHandler(`employee does not exists with id ${req.params.id}`))
    }

    await Employee.findByIdAndRemove(req.params.id);

    res.status(200).json({
        success:true,
        message:"User deleted"
    })
});

