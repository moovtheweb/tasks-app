const express = require('express')
const taskRouter = new express.Router()
const Task = require('../models/tasks.js')



taskRouter.get("/tasks",(req,res)=>{
    res.send("tasks get method")
})

taskRouter.post("/tasks",(req,res)=>{
    const task = new Task(req.body)
    
    task.save().then((task)=>{
        console.log("saved" + task)
    }).catch((error)=>{
        console.log("error"+error)
    })
    res.send(task)
})

module.exports = taskRouter