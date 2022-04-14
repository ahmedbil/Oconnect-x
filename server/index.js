const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const socketio = require('socket.io');

require('dotenv').config();

const mongoPassword = process.env.PASSWORD;
const url = `mongodb+srv://abilal2:${mongoPassword}@cluster0.chco2.mongodb.net/Cluster0?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

const app = express()
const port = 3000
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})