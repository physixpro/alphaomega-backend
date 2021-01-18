const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const { application } = require("express")
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const ObjectID = require('mongodb').ObjectID

mongoose.connect('mongodb+srv://data:1234@cluster0.qvhok.mongodb.net/Facebook?retryWrites=true&w=majority', {useUnifiedTopology:true, useNewUrlParser:true})
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open',function callback () {
    console.log("database is up and running")
} )

app.post('/users',  async (req,res) => {
    const newUser = req.body
    const x = await db.collection('users').insertOne(newUser)
    res.json("user successfully added to database")
    console.log(newUser)
})

app.get('/users', async(req,res)  => {
    const getUsers = await db.collection('users').find({}).toArray()
    res.json(getUsers)
    console.log(getUsers)
})

app.get('/users/:name', async(req,res) => {
    const name = req.params.name
    const info = await db.collection('users').find({name:name}).toArray()
    res.json(info);
})
app.get('/users/:userId', async(req,res) => {
    const id = req.params.userId
    const info = await db.collection('users').find({userId:userId}).toArray()
    res.json(info)
})

app.delete('/users/:userId', async(req,res) => {
    const id = req.params.userId
    const x = await db.collection('users').deleteOne({_id: new ObjectID (id)})
    res.json('user deleted')
})

const port = process.env.PORT || 3001
app.listen (port, () => console.log(`server is running on port ${port}... `))