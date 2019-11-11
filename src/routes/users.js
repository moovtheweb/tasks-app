const express = require('express')
const userRouter = new express.Router()
const User = require('../models/users')


userRouter.get("/users", async (req,res)=>{
    try{
            const users = await User.find({})
            res.send(users)
        }catch(e){
            console.log('error in fetching users')
            return res.status(500).send(e)
        }
        //console.log(req.body)
        res.send("Users Not Found")
    })


userRouter.get("/users/:id", async (req,res)=> {
    console.log(req.params)
    const _id = req.params.id
    try{
        const user = await User.findById(_id)
        if(!user){
             return res.status(404).send()
         }
         res.send(user)
     } catch(e){
        console.log('error in fetching users')
        return res.status(500).send()
    }
})

userRouter.post("/users", async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        console.log("saved" + user)
        return res.status(201).send(user)
    } catch(error){
        console.log("error"+error)
        return res.status(400).send()
    }
    res.send(user)
})

userRouter.patch("/users/:id", async (req,res)=> {
    console.log(req.params)
    const _id = req.params.id
    try{
        const user = await User.findByIdAndUpdate(_id,req.body,{new:true, runvalidators:true, })
        if(!user){
             return res.status(404).send()
         }
         res.status(200).send(user)
     } catch(e){
        console.log('error in fetching users')
        return res.status(500).send(e)
    }
})

userRouter.delete("/users/:id", async (req,res)=> {
    console.log(req.params)
    const _id = req.params.id
    try{
        const user = await User.findByIdAndUpdate(_id)
        if(!user){
             return res.status(404).send()
         }
         res.status(200).send(user)
     } catch(e){
        console.log('error in fetching users')
        return res.status(500).send(e)
    }
})

module.exports = userRouter