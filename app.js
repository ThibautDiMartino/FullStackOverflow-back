import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import indexRouter from './sources/routes/index.js';
import mongoose from 'mongoose';
import path from 'path';
import roomRouter from './sources/routes/room.js';
import signInRouter from './sources/routes/signIn.js';
import signUpRouter from './sources/routes/signUp.js';

// Retrieve db connection info
dotenv.config();

const app = express();

app.set('views', path.join(__dirname, './sources/views')).
    set('view engine', 'ejs');

app.use(cors());
// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to db
mongoose.connect(
    process.env.DB_CONNECTION,
    { useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
    console.log('Connected to db');
});

// Use ROUTES
app.use('/', indexRouter);
app.use('/room', roomRouter);
app.use('/signup', signUpRouter);
app.use('/signin', signInRouter);

app.listen(process.env.PORT, () => {
    console.log(`listenning to port ${process.env.PORT}`);
});

module.exports = app;