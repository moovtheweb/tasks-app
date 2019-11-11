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
    }catch(error){
            console.log("error"+error)
    }
    res.send(task)
})

module.exports = taskRouter