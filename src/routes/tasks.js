const express = require('express')
const taskRouter = new express.Router()
const Task = require('../models/tasks.js')

taskRouter.get("/tasks",async (req,res)=>{
    try{
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(e){
        return res.status(500).send()
    }
})


taskRouter.get("/tasks/:id", async (req,res)=>{
    console.log(req.params)
    _id=req.params.id
    try{
        const task = await Task.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        return res.status(500).send()
    }
})

taskRouter.post("/tasks", async (req,res)=>{
    const task = new Task(req.body)
    try{
        await task.save()
        console.log("saved" + task)
        return res.status(201).send(task)
    }catch(error){
            console.log("error"+error)
            return res.status(400).send()
    }
    res.send(task)
})

taskRouter.patch("/tasks/:id", async (req,res)=>{
    console.log(req.params)
    _id=req.params.id
    try{
        const task = await Task.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        return res.status(500).send()
    }
})

taskRouter.delete("/tasks/:id", async (req,res)=>{
    console.log(req.params)
    _id=req.params.id
    try{
        const task = await Task.findByIdAndDelete(_id,req.body)
        if(!task){
            return res.status(404).send("task not found")
        }
        res.send(task)
    } catch (e) {
        return res.status(500).send()
    }
})

module.exports = taskRouter

//below code block can check if the keys sent in the request body shoudl be allowed to update 
//the document in DB. this is not scalable. there should be a better way and also should be
//done at a central place. Hence this code is not incorporated and is only kept for refernece
// const updates = Object.keys(req.body)
// const allowedKeys = ['name', 'email','age']
// const validOperation = updates.every((update)=>{
//     return allowedKeys.includes(update)})
//if validOperation is false don'r let the update go through