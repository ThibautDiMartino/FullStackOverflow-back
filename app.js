const express = require('express');
const mongoose = require('mongoose');
const bobyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
// Retrieve db connection info
require('dotenv/config');

const app = express();

// const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, './sources/views'))
  .set('view engine', 'ejs');

app.use(cors());
// parse application/json
app.use(bobyParser.json());

// Connect to db
mongoose.connect(process.env.DB_CONNECTION,
  { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, () => {
    // console.log('connected to db');
  });

// Import ROUTES
const indexRouter = require('./sources/routes/index');
const signUpRouter = require('./sources/routes/signUp');

// Use ROUTES
app.use('/', indexRouter);
app.use('/signup', signUpRouter);

app.listen(process.env.PORT); // , () => console.log('Listenning on port 3000'));
