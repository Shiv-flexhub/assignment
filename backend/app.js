const express = require("express")
const app = express()
const cookieParser = require("cookie-parser");
const cors = require("cors")


const dotenv = require("dotenv");

dotenv.config({path:"./config/.env"})

const PORT = process.env.PORT || 8000;

const userRouter = require("./routes/userRoutes");
const employeeRouter = require("./routes/employeeRoute");

app.use(cors())

app.use(cookieParser())

app.use(express.json())
app.use("/user", userRouter);
app.use("/employee",employeeRouter);


const errorMiddleware = require("./middleware/error")

//Middleware for errors
app.use(errorMiddleware);

require("./database/connection");

app.listen(PORT,()=>{
    console.log(`Listening to the localhost port ${PORT}`)
})


module.exports = app;