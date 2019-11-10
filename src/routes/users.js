const express = require('express')
const userRouter = new express.Router()
const User = require('../models/users')


userRouter.get("/users",(req,res)=>{
    console.log(req.body)
    res.send("users get method")
})

userRouter.post("/users",(req,res)=>{
    const user = new User(req.body)
    
    user.save().then((user)=>{
        console.log("saved" + user)
    }).catch((error)=>{
        console.log("error"+error)
    })
    res.send(user)
})

module.exports = userRouter