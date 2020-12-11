const express = require('express') 
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
app.use(cors());

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

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`))