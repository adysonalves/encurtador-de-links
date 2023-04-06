const hbs = require('express-handlebars');


module.exports = function PackConfig(app,session) {

    // HANDLEBARS
    app.engine('hbs', hbs.engine({ defaultLayout: 'main', extname: 'hbs' }));
    app.set('view engine', 'hbs');

}