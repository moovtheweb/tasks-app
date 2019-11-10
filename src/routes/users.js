const express = require('express')
const userRouter = new express.Router()
const User = require('../models/users')


userRouter.get("/users",(req,res)=>{
    User.find({}).then((users) =>{
        res.send(users)
    }).catch((e)=>{
        console.log('error in fetching users')
    })
    //console.log(req.body)
    res.send("Users Not Found")
})

userRouter.get("/users/:id",(req,res)=> {
    console.log(req.params)
    const _id = req.params.id
     User.findById(_id).then((user) => {
         if(!user){
             return res.status(404).send()
         }
         res.send(user)
     }).catch((e)=>{
        return res.status(500).send()
         console.log('error in fetching users')
    })
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