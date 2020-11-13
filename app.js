const express = require('express');
const mongoose  = require('mongoose');
const bobyParser = require('body-parser');
const app = express();

// Retrieve db connection info
require('dotenv/config');

// parse application/json
app.use(bobyParser.json())

// Connect to db
mongoose.connect(process.env.DB_CONNECTION, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to db')
})

// Import ROUTES
const indexRouter = require('./sources/routes/index');
const signUpRouter = require('./sources/routes/signUp');

// Use ROUTES
app.use('/', indexRouter);
app.use('/signup', signUpRouter);

app.listen(3000, () => console.log('Listenning on port 3000'));