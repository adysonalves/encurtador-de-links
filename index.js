require('dotenv').config()
const express = require('express');
const hbs = require('express-handlebars');
const conn = require('./database/conn'); // database
const app = express();
const PORT = process.env.PORT || 3000;


// CONFIG APP
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

// HANDLEBARS
app.engine('hbs', hbs.engine({defaultLayout: 'main', extname: 'hbs'}));
app.set('view engine', 'hbs');

// MODELS
const Url = require('./models/Url');

// CONTROLLERS
const UrlsController = require('./controllers/UrlsControllers');

// ROTAS
app.get('/', UrlsController.home);
app.get('/u/:url?', UrlsController.acessaLink);
app.get('/audiencia/:url?', UrlsController.viewsUrl);
app.post('/encurtar', UrlsController.createLink);

app.use((req,res,next) => {
    res.redirect('/')
})



conn.sync()
.then(() => {
    app.listen(PORT);
}).catch(err => console.log(err))
