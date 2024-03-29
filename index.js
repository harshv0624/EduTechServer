const express=require('express')
const mongoose=require('mongoose')
const body=require('body-parser')
const jwt=require('jsonwebtoken')
const cors=require('cors')

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
} 
const app=express()
app.use(cors(corsOptions))
app.use(body.json())
require('dotenv').config()
require('./Models/USER')
const routes=require('./Routes/MainRoutes')
app.use(routes)
app.listen(process.env.PORT,()=>{
    console.log("Server Started")
})

mongoose.connect(process.env.DB_URL).then((res)=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log("Problem")
})