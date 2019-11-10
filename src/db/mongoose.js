const mongoose = require('mongoose')

const dbURL = 'mongodb://mongodb:27017'
const dbName = 'tasks-db'
const conString = dbURL + '/' + dbName
console.log('conString=>' + conString)


mongoose.connect(conString,{
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true})