// ROTAS
const HomeRouter = require('../routes/Home');

module.exports = function AppConfig(express, app) {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static('public'));
    app.use('/', HomeRouter);
}