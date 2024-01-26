const express=require('express')
const router=express.Router()
const User=require('../Models/USER')
const body=require('body-parser')
const jwt=require('jsonwebtoken')
const mailer=require('nodemailer')
require('dotenv').config()

async function sendEmail(email,code){
    const options=mailer.createTransport({
        host: "smtp.gmail.com",
        service:'gmail.com',
        port: 465,
        secure: false,
        requireTLS:true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        },
    })
    const info=await options.sendMail({
        from:'Server',
        to:`${email}`,
        subject:'Please Verify Your Account',
        text:`Verification Code : ${code}`
    })
}


router.post('/auth/sendOTP',async(req,res)=>{
    const {email,password}=req.body
    console.log(email)
    await User.findOne({email:email}).then(async(savedUser)=>{
        if(savedUser){
            console.log(User)
            res.send({error:"Email is already registered"})
            return
        }
        try{
            let verificationCode=Math.floor(100000 + Math.random() * 900000)
            let userD=[email,password,verificationCode]
            await sendEmail(email,verificationCode)
            res.send({message:"Mail Sent To User",data:userD})
        }catch(err){
            console.log(err)
            res.send({error:'Failed To Send Email'})
        }
    })

})

module.exports=router