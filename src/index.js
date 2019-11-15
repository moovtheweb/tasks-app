const express = require('express')
const bcrypt = require('bcryptjs')

require('./db/mongoose.js')
const User = require('./models/users.js')
const Task = require('./models/tasks.js')
const userRouter = require('./routes/users.js')
const taskRouter = require('./routes/tasks.js')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port,()=>{
    console.log('app is listening')
})
