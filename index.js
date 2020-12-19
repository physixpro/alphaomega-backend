const express = require('express') 
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
app.use(cors());

// gives us the ability to parse/decipher a post request 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb+srv://data:1234@cluster0.qvhok.mongodb.net/Facebook?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function callback (){
    console.log('Database is up and running')
})


app.get('/', async(req,res)=> {
    const feed = await db.collection('feed').find({}).toArray()
    res.json(feed)
})

// user hits send to localhost3001/michael 
app.get('/:name', async(req,res) => {
    // retreiving the name from the url and storring in variable called name
    const name = req.params.name 
    // putting condition inside curly braces , only find docs that are equal to the name in the url .
    const feed = await db.collection('feed').find({name:name}).toArray()
    res.json(feed)
})

// we have to " differntiate between the two routes " because to the server they will look the same without specificying additional path

// first route may be anything but it is best practice to call it the same name as what you're trying to find,

app.get('/status/:status', async(req,res) => {
    const status = req.params.status
    const feed = await db.collection('feed').find({status:status}).toArray()
    res.json(feed)
})


// Every request needs a response(duh)
app.post('/feed', async (req,res) => {
    // data is an object 
    const message = req.body;
    const x = await db.collection('feed').insertOne(message)
    console.log(message)
    res.json('hello')
})

app.post('/user', async (req,res) => {
    //info that user fills is stored in the req.body(duh) 
    const user = req.body
    const x = await db.collection('users').insertOne(user)
    res.json('A user was created!')
})



const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`))



//utilize placeholders to grab certain info.

//create a new collection and add things via postman/code 

//How to finish the register form?