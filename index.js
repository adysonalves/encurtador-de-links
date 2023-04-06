require('dotenv').config()
const express = require('express');
const conn = require('./database/conn'); // database
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || process.env.APP_PORT;


// SESSION
app.use(session({
    secret: process.env.CHAVE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10000 }
}));

// CONFIG APP
const AppConfig = require('./configs/AppConfig')(express, app);

// Modules Config
const PackConfig = require('./configs/PackConfig')(app);

// MODELS
const Url = require('./models/Url');


app.use((req, res, next) => {
    res.redirect('/')
});

// INICIA A APLICAÇÃO
conn.sync()
    .then(() => {
        app.listen(PORT);
    }).catch(err => console.log(err))
