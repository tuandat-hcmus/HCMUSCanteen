const accountRouter = require('./acc.r');

function route(app) {
    app.use(accountRouter);
}

module.exports = route;