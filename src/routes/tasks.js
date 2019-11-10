const express = require('express')
const taskRouter = new express.Router()
const Task = require('../models/tasks.js')

taskRouter.get("/tasks",(req,res)=>{
    Task.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch((e)=>{
        return res.status(500).send()
    })
})

taskRouter.get("/tasks/:id",(req,res)=>{
    console.log(req.params)
    _id=req.params.id
    Task.findById(_id).then((task)=>{
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }).catch((e)=>{
        return res.status(500).send()
    })
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