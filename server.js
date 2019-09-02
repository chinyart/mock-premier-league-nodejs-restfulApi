const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const db = require('./config/db').database;

//database connection

mongoose.connect(db, {useNewUrlParser: true})
    .then(() => {
        console.log('database connected succesfully')
    })
    .catch((err) => {
        console.log('unable to connect to the database', err)
    });

//defining the port
const port  = process.env.PORT || 5000;

//initialise cors Middle ware
app.use(cors());

// initialize body parsers Middleware
app.use(bodyParser.json());

const postRoute = require('./routes/api/post');
const fixtureRoute = require('./routes/api/FixtureController');
const teamRoute = require('./routes/api/TeamController');
const userRoute = require('./routes/api/UserController');
const authRoutes = require('./Auth/authController');

app.use('/api/auth', authRoutes);
app.use('/api/posts',verifyToken, postRoute);
app.use('/api/team', teamRoute);
app.use('/api/fixture', fixtureRoute);
app.use('/api/users', userRoute);

function verifyToken(req, res, next){
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        // Set the token
        req.token = bearer[1];
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }

}

// error middleware
app.use((req, res, next) => {
    res.status(404).send('Api endpoint not available')
});

//error 500
app.use((err, req, res, next) => {
    console.error(err.stack)
});

app.listen(port, () => {
    console.log(`server started on port: ${port}`)
});
