const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const socketio = require('socket.io');

const User = require("./models/users.model");

const app = express()
const port = 5000
const server = app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`)
})

require('dotenv').config();
const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000'
};



app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//Run on port or on localhost 5000
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);


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
    });
    
module.exports = {server : server};