require('dotenv').config()
const express = require('express');
const functions = require('firebase-functions');
const cors = require('cors')({origin: true});

const botRouter = require('./routes/bot');

const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())
// use cors
app.use(cors);

app.use('/bot', botRouter)


exports.api = functions.https.onRequest(app);