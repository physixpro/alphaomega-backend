const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const { application } = require("express")
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const ObjectID = require('mongodb').ObjectID

mongoose.connect('mongodb+srv://data:1234@cluster0.qvhok.mongodb.net/AlphaOmega?retryWrites=true&w=majority', {useUnifiedTopology:true, useNewUrlParser:true})
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open',function callback () {
    console.log("database is up and running")
} )

app.post('/requests',  async (req,res) => {
    const newRequest = req.body
    try{
    const x = await db.collection('requests').insertOne(newRequest)
    res.json("Request successfully sent to database")
    } catch(error){
    console.log(newRequest)}
})


const port = process.env.PORT || 3001
app.listen (port, () => console.log(`server is running on port ${port}... `))