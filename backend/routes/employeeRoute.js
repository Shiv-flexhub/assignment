const express = require("express");
const { addEmployee, updateEmployee, getAllEmployees, getEmployee, deleteEmployee } = require("../controllers/employeeController");



const employeeRouter = express.Router() 


employeeRouter.post("/addemployee",addEmployee);

employeeRouter.put("/updateemployee/:id",updateEmployee);

employeeRouter.get("/getemployee/:id",getEmployee);

employeeRouter.get("/getallemployee",getAllEmployees);

employeeRouter.delete("/deleteemployee/:id",deleteEmployee);

module.exports = employeeRouter;
